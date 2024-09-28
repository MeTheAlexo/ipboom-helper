import { PrismaClient } from '@prisma/client'

export const initializePrisma = () => {
	const prisma = new PrismaClient()

	return prisma
}
