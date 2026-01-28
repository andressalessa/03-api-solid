import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'

export async function search(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    // Zod is a library for validating data
    // it creates a schema for the data that is expected to be received
    const searchGymQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymQuerySchema.parse(request.query)

    const searchGymsService = makeSearchGymsService()

    const { gyms } = await searchGymsService.execute({
        query,
        page,
    })

    return reply.status(200).send({ gyms })
}
