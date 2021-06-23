<script lang="ts">
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import { isLogged } from '$lib/utils/stores'

  if (browser && !$isLogged) {
    goto('/')
  }
</script>

{#if !$isLogged}
  <div class="position-fixed vw-100 vh-100 d-flex align-items-center justify-content-center">
    Loading
  </div>
{/if}
