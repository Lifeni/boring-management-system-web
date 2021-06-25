<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { isLoading, isLogged, userInfo } from '$lib/stores/writable'
  import { post } from '$lib/utils/fetch'
  import { Button, Form, Input, Spinner } from 'sveltestrap'

  let username = decodeURIComponent($page.query.get('用户名') || '')
  let password = ''
  let status = 'waiting'

  const handleLogin = (e: Event) => {
    e.preventDefault()

    status = 'loading'
    post<ILoginRequest, IDataMessage<IUserResponse>>('/api/auth/login', {
      username: username,
      password: password
    })
      .then((res) => {
        isLogged.login()
        userInfo.login(res.data)
        goto('/')
        isLoading.set(true)
      })
      .catch(() => (status = 'error'))
  }

  const clearStatus = () => {
    if (status === 'error') {
      status = 'waiting'
    }
  }
</script>

<Form on:submit={handleLogin} class="d-grid p-4 gap-3 border rounded bg-white">
  <h1 class="fs-5 text-center mt-1">登录</h1>
  <Input
    id="username"
    name="username"
    placeholder="用户名"
    type="text"
    required
    autofocus
    autocomplete="off"
    bind:value={username}
    on:input={clearStatus}
  />
  <Input
    id="password"
    name="password"
    placeholder="密码"
    type="password"
    required
    autocomplete="current-password"
    bind:value={password}
    on:input={clearStatus}
  />
  {#if status === 'waiting'}
    <Button type="submit" block color="primary">登录</Button>
  {:else if status === 'loading'}
    <Button type="button" disabled block color="primary">
      <Spinner size="sm" />
    </Button>
  {:else if status === 'error'}
    <Button type="button" block color="danger">登录失败</Button>
  {/if}

  {#if decodeURIComponent($page.query.get('走错了吗')) === '是的'}
    <Button href="/" block outline color="primary">回到主页</Button>
  {/if}
</Form>
