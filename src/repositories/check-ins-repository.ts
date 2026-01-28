import { CheckIn, Prisma } from '@prisma/client'

// CheckInUncheckedCreateInput -> criar checkin quando os elementos de relacionamento (user e gym) já existem
// CheckInCreateInput -> criar checkin quando os elementos de relacionamento (user e gym) ainda não existem

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
