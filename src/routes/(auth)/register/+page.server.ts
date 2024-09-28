import { lucia } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { hash } from 'bcrypt'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/')
}

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData()
		const name = String(formData.get('name'))
		const email = String(formData.get('email'))
		const password = String(formData.get('password'))

		const passwordHash = await hash(password, 6)

		const emailAlreadyExist = await event.locals.prisma.user.findUnique({ where: { email } })
		if (emailAlreadyExist) {
			return fail(400, {
				error: 'Email already exist'
			})
		}

		const { id } = await event.locals.prisma.user.create({
			data: {
				name,
				email,
				password: passwordHash
			},
			select: { id: true }
		})

		const session = await lucia.createSession(id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		})

		redirect(302, '/')
	}
}
