import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeFetchUsersCheckInsHistoryService } from '@/services/factories/make-fetch-users-check-ins-history-service'

export async function history(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    // Zod is a library for validating data
    // it creates a schema for the data that is expected to be received
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

    const fetchUserCheckInsHistoryService = makeFetchUsersCheckInsHistoryService()

    const { checkIns } = await fetchUserCheckInsHistoryService.execute({
        userId: request.user.sub,
        page,
    })

    return reply.status(200).send({ checkIns })
}
