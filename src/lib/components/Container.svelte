<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { isLogged } from '$lib/utils/stores'
  import { Col, Container, Row } from 'sveltestrap'
</script>

{#if isLogged}
  <Container fluid class="d-flex flex-column h-100">
    <Row>
      <Col><Header /></Col>
    </Row>
    <Row class="flex-fill pt-5">
      <Col>
        <main class="w-100 h-100">
          <slot />
        </main>
      </Col>
    </Row>
  </Container>
{/if}
