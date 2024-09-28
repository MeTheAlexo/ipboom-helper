<script lang="ts">
	import { Package2, PanelLeft, Home, ChartPie } from 'lucide-svelte'
	import { Button } from './ui/button'
	import * as Sheet from './ui/sheet'

	let openMenu = false
</script>

<Sheet.Root bind:open={openMenu}>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline">
			<PanelLeft class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left">
		<nav class="grid gap-6 text-lg font-medium">
			<div
				class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
			>
				<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
				<span class="sr-only">Acme Inc</span>
			</div>
			<a
				href="/"
				class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				on:click={() => (openMenu = false)}
			>
				<Home class="h-5 w-5" />
				Dashboard
			</a>
			<a
				href="/"
				class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				on:click={() => (openMenu = false)}
			>
				<ChartPie class="h-5 w-5" />
				Settings
			</a>
		</nav>
	</Sheet.Content>
</Sheet.Root>
