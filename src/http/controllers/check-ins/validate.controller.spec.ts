import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in Controller (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to validate a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const responseGym = await request(app.server)
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

        const { id: gymId } = responseGym.body.gym

        const responseCheckIn = await request(app.server)
            .post(`/gyms/${gymId}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send(
                {
                    userLatitude: -27.0747279,
                    userLongitude: -49.5161522,
                }
            )

        const { id: checkInId } = responseCheckIn.body.checkIn

        const response = await request(app.server)
            .patch(`/check-ins/${checkInId}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(204)

        const checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkInId,
            },
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})
