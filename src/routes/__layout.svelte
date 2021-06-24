<script lang="ts">
  import { isLogged } from '$lib/stores/writable'
  import { checkAuth } from '$lib/utils/auth'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'gridjs/dist/theme/mermaid.css'
  import 'pattern.css/dist/pattern.min.css'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Spinner } from 'sveltestrap'

  let isLoading = true
  onMount(async () => {
    await checkAuth()
    isLoading = false
  })
</script>

{#if !isLogged || isLoading}
  <div class="loading-screen" out:fade>
    <Spinner color="primary" class="mt-4 mb-2" />
    <p class="fs-6 py-2 text-muted">正在加载</p>
  </div>
{:else}
  <div class="w-100 vh-100 px-5 py-4">
    <slot />
  </div>
{/if}
