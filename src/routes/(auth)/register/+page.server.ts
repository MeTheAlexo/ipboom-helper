import { lucia } from '$lib/server/auth'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { hash } from 'bcrypt'
import { setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { registerSchema } from '$lib/schemas'

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/')

	return {
		form: await superValidate(zod(registerSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema))
		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const { name, email, password } = form.data
		const passwordHash = await hash(password, 6)

		const emailAlreadyExist = await event.locals.prisma.user.findUnique({ where: { email } })
		if (emailAlreadyExist) {
			return setError(form, 'email', 'Email already exist')
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
