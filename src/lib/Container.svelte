<script lang="ts">
  import { Col, Container, Row } from 'sveltestrap'
  import Header from './Header.svelte'
  import Nav from './Nav.svelte'
</script>

<Container>
  <Row>
    <Col><Header /></Col>
  </Row>
  <Row>
    <Col><Nav /></Col>
    <Col><slot /></Col>
  </Row>
</Container>
