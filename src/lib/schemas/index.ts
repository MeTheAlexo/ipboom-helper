import { z } from 'zod'

export const registerSchema = z.object({
	name: z.string().min(2).max(255),
	email: z.string().min(2).max(255).email(),
	password: z.string().min(6).max(32)
})

export type RegisterSchema = typeof registerSchema

export const loginSchema = z.object({
	email: z.string().min(2).max(255).email(),
	password: z.string().min(1)
})

export type LoginSchema = typeof loginSchema
