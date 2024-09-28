<script lang="ts">
	import * as Card from '$lib/components/ui/card'

	export let title: string
	export let description: string
	export let footerText: string
	export let footerHref: string
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title class="text-xl">{title}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<slot />
	</Card.Content>
	<Card.Footer>
		<div class="mt-4 flex w-full justify-center text-sm">
			<a href={footerHref} class="underline">
				{footerText}
			</a>
		</div>
	</Card.Footer>
</Card.Root>
