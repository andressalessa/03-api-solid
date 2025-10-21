import { CheckIn, Prisma } from '@prisma/client'

// CheckInUncheckedCreateInput -> criar checkin quando os elementos de relacionamento (user e gym) já existem
// CheckInCreateInput -> criar checkin quando os elementos de relacionamento (user e gym) ainda não existem

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
