<script lang="ts">
	import * as DropdownMenu from './ui/dropdown-menu'
	import { Button } from './ui/button'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import * as Avatar from './ui/avatar'

	const logout = async () => {
		await fetch('/logout', { method: 'post' })
		await invalidateAll()
	}
</script>

{#if $page.data.user}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Avatar.Root>
				{#if $page.data.user.avatar}
					<Avatar.Image src={$page.data.user.avatar} alt={$page.data.user.name} />
				{:else}
					<Avatar.Image
						src={`https://api.dicebear.com/9.x/initials/svg?seed=${$page.data.user.name}`}
						alt={$page.data.user.name}
					/>
				{/if}
			</Avatar.Root>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>{$page.data.user.email}</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<Button size="sm" href="/login">Login</Button>
{/if}
