import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckinServiceRequest {
  checkInId: string
}

interface ValidateCheckinServiceResponse {
  checkIn: CheckIn
}

// TDD -> Test Driven Development
// Red -> Green -> Refactor
// Red -> escrever o teste e ver ele falhar
// Green -> escrever o código mínimo para fazer o teste passar
// Refactor -> refatorar o código mantendo os testes passando

export class ValidateCheckinService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinServiceRequest): Promise<ValidateCheckinServiceResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    // diff -> data_futuro | data_passado
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkinsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
