<script lang="ts">
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap'

  export let toggle: () => void
  export let isOpen: boolean
  export let size: string = 'sm'
</script>

<Modal class="global-modal" {isOpen} {toggle} {size}>
  <ModalHeader {toggle}>
    <slot name="header" />
  </ModalHeader>
  <ModalBody>
    <slot name="body" />
  </ModalBody>
  <ModalFooter>
    <slot name="footer" />
    <Button color="secondary" outline on:click={toggle}>取消</Button>
  </ModalFooter>
</Modal>
