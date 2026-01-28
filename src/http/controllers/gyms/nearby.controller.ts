import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    // Zod is a library for validating data
    // it creates a schema for the data that is expected to be received

    // coerce.number() converts the string to a number
    // every parameter in the query is a string, so we need to convert it to a number
    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const nearbyGymsService = makeFetchNearbyGymsService()

    const { gyms } = await nearbyGymsService.execute({
        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(200).send({ gyms })
}
