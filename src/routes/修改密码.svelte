<script lang="ts">
  import Auth from '$lib/components/Auth.svelte'
  import ResetPasswordBox from '$lib/components/ResetPasswordBox.svelte'
  import { userInfo } from '$lib/stores/writable'
  import { roleMap } from '$lib/utils/maps'
</script>

<svelte:head>
  <title>修改密码</title>
</svelte:head>

<Auth>
  <main class="h-100 d-flex justify-content-evenly align-items-center">
    <section class="text-center">
      <h1 class="fs-2">修改「{$userInfo.name}」的密码</h1>
      <p class="fs-5 mb-3">
        <code>ID {$userInfo.id} | {roleMap($userInfo.role)}</code>
      </p>
    </section>
    <ResetPasswordBox />
  </main>
</Auth>
