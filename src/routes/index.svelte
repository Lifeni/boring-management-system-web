<script>
  import LoginBox from '$lib/LoginBox.svelte'
  import { Button, Nav, NavItem, NavLink } from 'sveltestrap'

  let logged = false
</script>

<svelte:head>
  {#if logged}
    <title>一个教务管理系统</title>
  {:else}
    <title>登录 | 一个教务管理系统</title>
  {/if}
</svelte:head>

{#if logged}
  <Nav>
    <NavItem>
      <NavLink class="px-2" href="/login">
        <Button color="primary">登录</Button>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        class="px-2"
        href="https://github.com/Lifeni/boring-management-system"
        rel="external"
      >
        <Button color="primary" outline>GitHub</Button>
      </NavLink>
    </NavItem>
  </Nav>
{:else}
  <main class="h-100 d-flex flex-md-row flex-column justify-content-evenly align-items-center">
    <section class="text-center">
      <h1 class="fs-3">一个教务管理系统</h1>
      <p class="fs-5 mb-3">
        <code>boring-management-system</code>
      </p>
    </section>
    <LoginBox />
  </main>
{/if}
