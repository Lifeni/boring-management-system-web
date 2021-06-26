<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { isLoading, isLogged } from '$lib/stores/writable'
  import { checkAuth } from '$lib/utils/check-auth'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { Col, Container, Row, Spinner } from 'sveltestrap'

  if (!$isLogged) {
    isLoading.set(true)
  }

  onMount(async () => {
    if (!$isLogged) {
      await checkAuth()
      isLoading.set(false)
    }
  })
</script>

{#if !$isLogged || $isLoading}
  <div class="loading-screen" out:fade={{ duration: 200 }}>
    <Spinner color="primary" class="mt-4 mb-2" />
    <p class="fs-6 py-2 text-muted">正在加载</p>
  </div>
{:else}
  <Container fluid class="d-flex flex-column h-100">
    <Row>
      <Col><Header /></Col>
    </Row>
    <Row class="flex-fill">
      <Col>
        <main class="position-relative w-100 h-100">
          <slot />
        </main>
      </Col>
    </Row>
  </Container>
{/if}
