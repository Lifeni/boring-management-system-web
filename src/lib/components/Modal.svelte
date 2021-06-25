<script lang="ts">
  import { modal, modalInput } from '$lib/stores/writable'
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'sveltestrap'

  let toggle = () => modal.close()
  let input = ''
  $: thisModal = $modal
  $: modalInput.set(input)
</script>

<Modal class="global-modal" isOpen={thisModal.isOpen} {toggle} size={thisModal.size}>
  <ModalHeader {toggle}>{thisModal.title}</ModalHeader>
  <ModalBody>
    {@html thisModal.body}
    {#if thisModal.hasInput}
      <Input
        class="mt-3"
        type={thisModal.inputType || 'text'}
        placeholder={thisModal.inputPlaceholder || '请输入 ...'}
        autofocus
        bind:value={input}
      />
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button color={thisModal.actionType || 'primary'} on:click={() => thisModal.action()}>
      {thisModal.actionText || '确定'}
    </Button>
    <Button color="secondary" outline on:click={toggle}>取消</Button>
  </ModalFooter>
</Modal>
