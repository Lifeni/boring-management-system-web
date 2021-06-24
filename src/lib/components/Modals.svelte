<script lang="ts">
  import { modals } from '$lib/stores/writable'
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'sveltestrap'

  let toggle = () => modals.close()
  $: modal = $modals
</script>

<Modal class="global-modals" isOpen={modal.isOpen} {toggle} size={modal.size}>
  <ModalHeader {toggle}>{modal.title}</ModalHeader>
  <ModalBody>
    {@html modal.body}
    {#if modal.hasInput}
      <Input
        class="mt-3"
        type={modal.inputType || 'text'}
        placeholder={modal.inputPlaceholder || '请输入 ...'}
      />
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button color={modal.actionType || 'primary'} on:click={() => modal.action()}>
      {modal.actionText || '确定'}
    </Button>
    <Button color="secondary" outline on:click={toggle}>取消</Button>
  </ModalFooter>
</Modal>
