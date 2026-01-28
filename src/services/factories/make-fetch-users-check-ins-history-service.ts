import { FetchUserCkeckInHistoryService } from '../fetch-user-check-ins-history.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUsersCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCkeckInHistoryService(checkInsRepository)

  return service
}
