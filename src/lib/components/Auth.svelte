<script lang="ts">
  import { isLoading, isLogged } from '$lib/stores/writable'
  import { checkAuth } from '$lib/utils/check-auth'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Spinner } from 'sveltestrap'

  onMount(async () => {
    isLoading.set(true)
    if (!$isLogged) {
      await checkAuth()
    }
    isLoading.set(false)
  })
</script>

{#if !$isLogged || $isLoading}
  <div class="loading-screen" out:fade={{ duration: 200 }}>
    <Spinner color="primary" class="mt-4 mb-2" />
    <p class="fs-6 py-2 text-muted">正在加载</p>
  </div>
{:else}
  <slot />
{/if}
