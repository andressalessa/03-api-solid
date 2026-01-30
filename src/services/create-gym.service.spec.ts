import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym.service'

let gymsRepository: InMemoryGymsRepository
let createGymService: CreateGymService

describe('Register Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymService = new CreateGymService(gymsRepository)
  })
  it('should be able to register', async () => {
    const { gym } = await createGymService.execute({
      title: 'JavaScript Gym',
      description: 'The best gym in town',
      phone: '1234567890',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
