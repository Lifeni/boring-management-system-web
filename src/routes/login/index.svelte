<script>
  import { Button, Form, Input, Spinner } from 'sveltestrap'

  let username = ''
  let password = ''
  let status = 'waiting'

  const handleLogin = (e) => {
    e.preventDefault()

    status = 'loading'

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then((res) => {
        if (res.ok) {
          // TODO
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

<svelte:head>
  <title>登录 | 一个教务管理系统</title>
</svelte:head>

<Form on:submit={handleLogin} class="d-grid p-4 gap-3 border rounded">
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
