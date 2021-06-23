<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { isLogged } from '$lib/utils/stores'
  import { Col, Container, Row } from 'sveltestrap'
</script>

{#if isLogged}
  <Container fluid>
    <Row>
      <Col><Header /></Col>
    </Row>
    <Row class="pt-5">
      <!-- <Col xs="3"><Nav /></Col> -->
      <Col>
        <main class="w-100 border rounded">
          <slot />
        </main>
      </Col>
    </Row>
  </Container>
{/if}
