import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCkeckInHistoryServiceRequest {
  userId: string
  page: number
}

interface FetchUserCkeckInHistoryServiceResponse {
  checkIns: CheckIn[]
}

// TDD -> Test Driven Development
// Red -> Green -> Refactor
// Red -> escrever o teste e ver ele falhar
// Green -> escrever o código mínimo para fazer o teste passar
// Refactor -> refatorar o código mantendo os testes passando

export class FetchUserCkeckInHistoryService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCkeckInHistoryServiceRequest): Promise<FetchUserCkeckInHistoryServiceResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
