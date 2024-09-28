import { lucia } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { compare } from 'bcrypt'
import { loginSchema } from '$lib/schemas'
import { setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/')

	return {
		form: await superValidate(zod(loginSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema))
		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const { email, password } = form.data

		const existingUser = await event.locals.prisma.user.findUnique({ where: { email } })
		if (!existingUser) {
			return setError(form, 'email', 'Incorrect email')
		}

		const validPassword = await compare(password, existingUser.password)
		if (!validPassword) {
			return setError(form, 'password', 'Incorrect password')
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
