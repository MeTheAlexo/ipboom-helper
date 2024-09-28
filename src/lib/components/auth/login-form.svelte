<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import { loginSchema, type LoginSchema } from '$lib/schemas'
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import FormWrapper from './form-wrapper.svelte'

	export let data: SuperValidated<Infer<LoginSchema>>

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	})

	const { form: formData, enhance } = form
</script>

<FormWrapper
	title="Login"
	description="Enter your email below to login to your account"
	footerText="Don't have an account?"
	footerHref="/register"
>
	<form method="POST" use:enhance class="space-y-4">
		<!-- Email -->
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input type="email" {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Password -->
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button class="w-full">Login</Form.Button>
	</form>
</FormWrapper>
