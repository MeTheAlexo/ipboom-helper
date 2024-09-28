import type { RequestHandler } from './$types'
import { lucia } from '$lib/server/auth'

export const POST: RequestHandler = async (event) => {
	await lucia.invalidateSession(event.locals.session!.id)
	const sessionCookie = lucia.createBlankSessionCookie()
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	})
	return new Response()
}
