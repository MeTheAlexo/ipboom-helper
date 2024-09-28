declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			prisma: import('@prisma/client').PrismaClient
			user: import('lucia').User | null
			session: import('lucia').Session | null
		}
		interface PageData {
			user: import('lucia').User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
