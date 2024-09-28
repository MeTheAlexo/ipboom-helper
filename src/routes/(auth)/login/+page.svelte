<script lang="ts">
	import { LoginForm } from '$components/auth'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<LoginForm data={data.form} />
