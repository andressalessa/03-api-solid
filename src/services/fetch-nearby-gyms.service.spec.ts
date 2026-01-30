import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearByService } from './fetch-nearby-gyms.service'

let gymsRepository: InMemoryGymsRepository
let gymsService: FetchNearByService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    gymsService = new FetchNearByService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'The best gym in town',
      phone: '1234567890',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'The best gym in town',
      phone: '1234567890',
      latitude: -22.8942774,
      longitude: -43.5840545,
      // -43.5853101-22.8929099
    })

    const { gyms } = await gymsService.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
