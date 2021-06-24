<script lang="ts">
  import { toast } from '$lib/utils/stores'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'
</script>

<div class="w-100 vh-100 px-5 py-4">
  <slot />
</div>

<Toast class="global-toast" autohide isOpen={$toast.isOpen} on:close={() => toast.close()}>
  <ToastHeader icon="warning">{$toast.title}</ToastHeader>
  <ToastBody>{$toast.body}</ToastBody>
</Toast>
