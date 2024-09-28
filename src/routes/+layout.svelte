<script lang="ts">
	import '../app.css'
	import { Button } from '$components/ui/button'
	import type { LayoutData } from './$types'
	import { invalidateAll } from '$app/navigation'

	export let data: LayoutData

	const logout = async () => {
		await fetch('/logout', { method: 'post' })
		await invalidateAll()
	}
</script>

{#if data.user}
	{data.user.email}
	<Button on:click={logout}>Logout</Button>
{/if}

<main>
	<slot />
</main>
