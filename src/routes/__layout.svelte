<script lang="ts">
  import { goto } from '$app/navigation'
  import { isLoading, isLogged } from '$lib/stores/writable'
  import { checkAuth } from '$lib/utils/check-auth'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'gridjs/dist/theme/mermaid.css'
  import 'pattern.css/dist/pattern.min.css'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Spinner } from 'sveltestrap'

  isLoading.set(true)
  onMount(async () => {
    const result = await checkAuth()
    if (result) {
      isLoading.set(false)
    } else {
      await goto('/登录', { replaceState: true })
      isLoading.set(false)
    }
  })
</script>

{#if !$isLogged || $isLoading}
  <div class="loading-screen" out:fade>
    <Spinner color="primary" class="mt-4 mb-2" />
    <p class="fs-6 py-2 text-muted">正在加载</p>
  </div>
{:else}
  <div class="w-100 vh-100 px-5 py-4">
    <slot />
  </div>
{/if}
