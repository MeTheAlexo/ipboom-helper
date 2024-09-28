<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import { registerSchema, type RegisterSchema } from '$lib/schemas'
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import FormWrapper from './form-wrapper.svelte'

	export let data: SuperValidated<Infer<RegisterSchema>>

	const form = superForm(data, {
		validators: zodClient(registerSchema)
	})

	const { form: formData, enhance } = form
</script>

<FormWrapper
	title="Sign Up"
	description="Enter your information to create an account"
	footerText="Already have an account?"
	footerHref="/login"
>
	<form method="POST" use:enhance class="space-y-4">
		<!-- Name -->
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>Name</Form.Label>
				<Input {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

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

		<Form.Button class="w-full">Create an account</Form.Button>
	</form>
</FormWrapper>
