import { lucia } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { compare } from 'bcrypt'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/')
}

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData()
		const email = String(formData.get('email'))
		const password = String(formData.get('password'))

		const existingUser = await event.locals.prisma.user.findUnique({ where: { email } })
		if (!existingUser) {
			return fail(400, {
				message: 'Incorrect username or password'
			})
		}

		const validPassword = await compare(password, existingUser.password)
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			})
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})

		redirect(302, '/')
	}
}
