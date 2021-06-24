<script lang="ts">
  import { checkAuth } from '$lib/utils/auth'
  import { isLogged } from '$lib/utils/stores'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'pattern.css/dist/pattern.min.css'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Spinner } from 'sveltestrap'

  let isLoading = null
  onMount(() => {
    if (!$isLogged) isLoading = checkAuth()
  })
</script>

{#if isLoading === null}
  <div class="loading-screen" out:fade>
    <Spinner color="primary" class="mt-4 mb-2" />
    <p class="fs-6 py-2 text-muted">正在加载</p>
  </div>
{:else}
  <div class="w-100 vh-100 px-5 py-4">
    <slot />
  </div>
{/if}

<style global>
  :root {
    --bs-font-sans-serif: Inter, '阿里巴巴普惠体 2.0', 'Source Han Sans SC', system-ui,
      -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' !important;
    --bs-font-monospace: 'Fira Mono', 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', var(--bs-font-sans-serif) !important;

    font-size: 18px;
    font-weight: 600;
  }

  body {
    font-family: var(--bs-font-sans-serif);
    min-width: 1024px;
  }

  .fs-7 {
    font-size: 0.875rem !important;
  }

  .dropdown .btn-outline-primary {
    background-color: #fff;
  }

  .dropdown .btn-outline-primary:hover {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
  }

  .loading-screen {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
</style>
