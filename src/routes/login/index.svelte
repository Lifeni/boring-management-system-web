<script>
  import { Button, Form, Input } from 'sveltestrap'

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(username, password)
  }

  let username = ''
  let password = ''
</script>

<svelte:head>
  <title>登录 | 一个教务管理系统</title>
</svelte:head>

<main class="d-flex flex-column justify-content-center align-items-center gap-3 w-100 min-vh-100">
  <Form class="d-grid p-4 gap-3 border rounded">
    <h1 class="fs-5 text-center">登录</h1>
    <Input id="username" name="username" placeholder="用户名" type="text" bind:value={username} />
    <Input id="password" name="password" placeholder="密码" type="password" bind:value={password} />
    <Button block color="primary" on:click={handleLogin}>登录</Button>
  </Form>
</main>
