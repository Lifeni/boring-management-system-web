<script>
  import { Button, Form, Input, Spinner } from 'sveltestrap'
  import { user } from '../stores'

  let username = ''
  let password = ''
  let status = 'waiting'

  const handleLogin = (e) => {
    e.preventDefault()

    status = 'loading'

    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then(async (res) => {
        if (res.ok) {
          const data = (await res.json()).data
          user.set({
            isLogged: true,
            userInfo: { id: data.userId, role: data.role }
          })
        } else {
          status = 'error'
        }
      })
      .catch((err) => {
        console.error(err)
        status = 'error'
      })
  }

  const clearStatus = () => {
    if (status === 'error') {
      status = 'waiting'
    }
  }
</script>

<Form on:submit={handleLogin} class="d-grid p-4 gap-3 border rounded bg-white">
  <h1 class="fs-5 text-center">登录</h1>
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
</Form>
