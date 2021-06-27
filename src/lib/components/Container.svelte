<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { isLoading, isLogged } from '$lib/stores/writable'
  import { checkAuth } from '$lib/utils/check-auth'
  import { onMount } from 'svelte'
  import { Col, Container, Row } from 'sveltestrap'
  import Auth from './Auth.svelte'

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

<Auth>
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
</Auth>
