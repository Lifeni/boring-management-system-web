<script lang="ts">
  import { toast } from '$lib/stores/writable'
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'

  $: to = $toast
</script>

<Toast class="global-toast fs-6" autohide isOpen={to.isOpen} on:close={() => toast.close()}>
  <ToastHeader toggle={() => toast.close()} icon={to.color || 'primary'}>
    {to.title}
  </ToastHeader>
  <ToastBody>{to.body}</ToastBody>
</Toast>
