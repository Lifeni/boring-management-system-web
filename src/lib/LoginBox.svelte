<script lang="ts">
  import { Button, Form, Input, Spinner } from 'sveltestrap'
  import { post } from '../utils/fetch'
  import { user } from '../utils/stores'

  let username = ''
  let password = ''
  let status = 'waiting'

  const handleLogin = (e: Event) => {
    e.preventDefault()

    status = 'loading'
    post<LoginRequest, IDataMessage<LoginResponse>>('/api/auth/login', {
      username: username,
      password: password
    })
      .then((res) => setUserInfo(res.data))
      .catch(() => (status = 'error'))
  }

  const setUserInfo = (data: LoginResponse) => {
    user.set({
      isLogged: true,
      userInfo: {
        id: data.userId,
        role: data.role,
        name: data.userName
      }
    })
  }

  const clearStatus = () => {
    if (status === 'error') {
      status = 'waiting'
    }
  }
</script>

<Form on:submit={handleLogin} class="d-grid p-4 gap-3 border rounded bg-white">
  <h1 class="fs-5 text-center fw-light">登录</h1>
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
    class="fw-light"
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
    class="fw-light"
  />
  {#if status === 'waiting'}
    <Button type="submit" block color="primary" class="fw-light">登录</Button>
  {:else if status === 'loading'}
    <Button type="button" disabled block color="primary">
      <Spinner size="sm" />
    </Button>
  {:else if status === 'error'}
    <Button type="button" block color="danger" class="fw-light">登录失败</Button>
  {/if}
</Form>
