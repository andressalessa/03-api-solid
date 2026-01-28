import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function create(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    // Zod is a library for validating data
    // it creates a schema for the data that is expected to be received
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            // Math.abs alter the value sign to positive even if it's negative
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body)

    const createGymService = makeCreateGymService()

    const { gym } = await createGymService.execute({
        title, 
        description, 
        phone, 
        latitude, 
        longitude, 
    })

    return reply.status(201).send({ gym })
}
