import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearByServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByServiceResponse {
  gyms: Gym[]
}

export class FetchNearByService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByServiceRequest): Promise<FetchNearByServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
