<script lang="ts">
	import { RegisterForm } from '$components/auth'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<RegisterForm data={data.form} />
