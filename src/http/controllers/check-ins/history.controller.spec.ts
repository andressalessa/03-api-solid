import request from 'supertest'
import { app } from '@/app'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Check-in History Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(async () => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to list the history of check-ins ', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const gym = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    title: 'JavaScript Gym',
                    description: 'Some description',
                    phone: '1234567890',
                    latitude: -27.0747279,
                    longitude: -49.5161522,
                }
            )

        const { id: gymId } = gym.body.gym

        vi.setSystemTime(new Date(2026, 0, 8, 8, 0, 0)) // Jan 20, 2022 08:00:00

        const checkIn1 = await request(app.server)
            .post(`/gyms/${gymId}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    userLatitude: -27.0747279,
                    userLongitude: -49.5161522,
                }
            )

        vi.setSystemTime(new Date(2026, 0, 9, 8, 0, 0)) // Jan 20, 2022 08:00:00

        const checkIn2 = await request(app.server)
            .post(`/gyms/${gymId}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    userLatitude: -27.0747279,
                    userLongitude: -49.5161522,
                }
            )

        const response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: checkIn1.body.checkIn.gym_id,
            }),
            expect.objectContaining({
                gym_id: checkIn2.body.checkIn.gym_id,
            }),
        ])
    })
})
