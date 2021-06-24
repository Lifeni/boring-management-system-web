<script lang="ts">
  import { toast } from '$lib/stores/writable'
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'

  $: to = $toast
</script>

<Toast class="global-toast" autohide isOpen={to.isOpen} on:close={() => toast.close()}>
  <ToastHeader icon="warning">{to.title}</ToastHeader>
  <ToastBody>{to.body}</ToastBody>
</Toast>
