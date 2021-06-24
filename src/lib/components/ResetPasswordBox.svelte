<script lang="ts">
  import { goto } from '$app/navigation'
  import { post } from '$lib/utils/fetch'
  import { isLogged, userInfo } from '$lib/utils/stores'
  import { onDestroy } from 'svelte'
  import { Button, Form, Input, Spinner } from 'sveltestrap'

  let oldPassword = ''
  let newPassword = ''
  let newPasswordAgain = ''

  let status = 'waiting'
  let time = 6
  let clock: null | NodeJS.Timeout = null

  const handleLogin = (e: Event) => {
    e.preventDefault()

    status = 'loading'
    post<IResetPasswordRequest, IBaseMessage>('/api/auth/reset-password', {
      userId: $userInfo.id,
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .then(() => {
        status = 'ok'
        const userName = $userInfo.name
        clock = setInterval(() => {
          time -= 1
          if (time <= 0) {
            isLogged.logout()
            userInfo.logout()
            goto(`/登录?用户名=${userName}`)
          }
        }, 1000)
      })
      .catch(() => (status = 'error'))
  }

  const clearStatus = () => {
    if (status === 'error') {
      status = 'waiting'
    }
  }

  $: noPasswordEmpty = !!oldPassword && !!newPassword && !!newPasswordAgain
  $: sameOldPassword = oldPassword === newPassword
  $: sameNewPassword = newPassword === newPasswordAgain
  $: checkPassword = !sameOldPassword && sameNewPassword

  onDestroy(() => {
    if (clock) {
      clearInterval(clock)
    }
  })
</script>

<Form on:submit={handleLogin} class="d-grid p-4 gap-3 border rounded bg-white">
  <h1 class="fs-5 text-center mt-1">重置密码</h1>
  <Input
    id="old-password"
    name="old-password"
    placeholder="旧的密码"
    type="password"
    required
    autofocus
    autocomplete="old-password"
    bind:value={oldPassword}
    on:input={clearStatus}
  />
  <Input
    id="new-password"
    name="new-password"
    placeholder="新的密码"
    type="password"
    required
    autocomplete="new-password"
    bind:value={newPassword}
    on:input={clearStatus}
  />
  <Input
    id="new-password-again"
    name="new-password-again"
    placeholder="再来一次"
    type="password"
    required
    autocomplete="new-password"
    bind:value={newPasswordAgain}
    on:input={clearStatus}
  />
  {#if status === 'waiting'}
    {#if noPasswordEmpty && !checkPassword}
      <Button type="button" block color="warning" disabled>
        {#if sameOldPassword}
          新旧密码不能相同
        {:else if !sameNewPassword}
          两个密码不一致
        {/if}
      </Button>
    {:else}
      <Button type="submit" block color="primary" disabled={!checkPassword}>重置</Button>
    {/if}
  {:else if status === 'ok'}
    <Button type="button" disabled block color="success">重置成功（{time} 秒后跳转）</Button>
  {:else if status === 'loading'}
    <Button type="button" disabled block color="primary">
      <Spinner size="sm" />
    </Button>
  {:else if status === 'error'}
    <Button type="button" block color="danger">重置失败</Button>
  {/if}
  <Button href="/" block outline color="primary">回到主页</Button>
</Form>
