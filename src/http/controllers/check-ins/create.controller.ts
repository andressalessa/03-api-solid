import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function create(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    // Zod is a library for validating data
    // it creates a schema for the data that is expected to be received
    
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const checkInBodySchema = z.object({
        userLatitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { userLatitude, userLongitude } = checkInBodySchema.parse(request.body)

    const checkInService = makeCheckInService()

    const { checkIn } = await checkInService.execute({
        gymId,
        userId: request.user.sub,
        userLatitude,
        userLongitude,
    })

    return reply.status(201).send({ checkIn })
}
