import { lucia } from '$lib/server/auth'
import { initializePrisma } from '$lib/server/prisma'
import type { PrismaClient } from '@prisma/client'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

let prisma: PrismaClient
const handlePrisma: Handle = async ({ event, resolve }) => {
	if (!prisma) {
		prisma = initializePrisma()
	}

	event.locals.prisma = prisma

	return resolve(event)
}

const handleLucia: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName)
	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	const { session, user } = await lucia.validateSession(sessionId)

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})
	}

	event.locals.user = user
	event.locals.session = session

	return resolve(event)
}

export const handle = sequence(handlePrisma, handleLucia)
