<script lang="ts">
	import { Search } from 'lucide-svelte'
	import { Input } from './ui/input'
	import NavbarUser from './navbar-user.svelte'
	import NavbarMenu from './navbar-menu.svelte'
</script>

<header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
	<NavbarMenu />

	<div class="relative ml-auto flex-1">
		<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
		<Input type="search" placeholder="Search..." class="w-full rounded-lg bg-background pl-8" />
	</div>

	<NavbarUser />
</header>
