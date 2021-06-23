<script lang="ts">
  import ResetPasswordBox from '$lib/components/ResetPasswordBox.svelte'
  import { roleMap } from '$lib/utils/map'
  import { isLogged, userInfo } from '$lib/utils/stores'
</script>

{#if isLogged}
  <main class="h-100 d-flex justify-content-evenly align-items-center">
    <section class="text-center">
      <h1 class="fs-2">重置「{$userInfo.name}」的密码</h1>
      <p class="fs-5 mb-3">
        <code>ID {$userInfo.id} | {roleMap($userInfo.role)}</code>
      </p>
    </section>
    <ResetPasswordBox />
  </main>
{/if}
