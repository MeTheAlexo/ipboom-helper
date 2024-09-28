<script lang="ts">
	import '../app.css'
	import { Navbar } from '$components'
</script>

<Navbar />

<main class="px-6 py-4">
	<slot />
</main>
