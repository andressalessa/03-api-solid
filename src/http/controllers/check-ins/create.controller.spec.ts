import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Create Check-In Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

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

        const response = await request(app.server)
            .post(`/gyms/${gymId}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    userLatitude: -27.0747279,
                    userLongitude: -49.5161522,
                }
            )

        expect(response.statusCode).toEqual(201)
    })
})
