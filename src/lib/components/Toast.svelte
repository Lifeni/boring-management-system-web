<script lang="ts">
  import { toast } from '$lib/stores/writable'
  import { Toast, ToastBody, ToastHeader, Icon } from 'sveltestrap'

  $: to = $toast
</script>

<Toast class="global-toast" autohide isOpen={to.isOpen} on:close={() => toast.close()}>
  <ToastHeader>
    {#if to.type === 'ok'}
      <Icon name="check-circle-fill" slot="icon" class={`me-2 text-${to.color || 'primary'}`} />
    {:else if to.type === 'error'}
      <Icon
        name="exclamation-circle-fill"
        slot="icon"
        class={`me-2 text-${to.color || 'primary'}`}
      />
    {:else if to.type === 'info'}
      <Icon name="question-circle-fill" slot="icon" class={`me-2 text-${to.color || 'primary'}`} />
    {:else}
      <Icon name="circle-fill" slot="icon" class={`me-2 text-${to.color || 'primary'}`} />
    {/if}
    {to.title}
  </ToastHeader>
  <ToastBody>{to.body}</ToastBody>
</Toast>
