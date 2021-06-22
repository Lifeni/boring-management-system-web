<script>
  import { Button, Nav, NavItem, NavLink } from 'sveltestrap'
</script>

<svelte:head>
  <title>一个教务管理系统</title>
</svelte:head>

<h1 class="fs-3">一个教务管理系统</h1>
<p class="fs-5 mb-3">
  <code>boring-management-system</code>
</p>
<Nav>
  <NavItem>
    <NavLink class="px-2" href="/login">
      <Button color="primary">登录</Button>
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink class="px-2" href="https://github.com/Lifeni/boring-management-system" rel="external">
      <Button color="primary" outline>GitHub</Button>
    </NavLink>
  </NavItem>
</Nav>
