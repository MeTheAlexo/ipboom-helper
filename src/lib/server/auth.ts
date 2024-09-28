import { Lucia } from 'lucia'
import { dev } from '$app/environment'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { initializePrisma } from './prisma'

const prisma = initializePrisma()
const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			name: attributes.name,
			email: attributes.email,
			avatar: attributes.avatar
		}
	}
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	name: string
	email: string
	avatar?: string
}
