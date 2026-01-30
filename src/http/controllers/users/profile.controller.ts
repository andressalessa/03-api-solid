import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({ 
    userId: (request.user as { sub: string }).sub 
  })

  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
