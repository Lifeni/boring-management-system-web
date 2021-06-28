<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { Col, Container, Row } from 'sveltestrap'
  import Auth from './Auth.svelte'
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
