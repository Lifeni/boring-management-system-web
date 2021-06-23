<script lang="ts">
  import Container from '$lib/Container.svelte'
  import LoginBox from '$lib/LoginBox.svelte'
  import { onDestroy } from 'svelte'
  import { user } from '../utils/stores'

  let isLogged: boolean
  let userInfo: UserInfo

  const unsubscribe = user.subscribe((value) => {
    isLogged = value.isLogged
    userInfo = value.userInfo
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<svelte:head>
  {#if isLogged}
    <title>一个教务管理系统</title>
  {:else}
    <title>登录 | 一个教务管理系统</title>
  {/if}
</svelte:head>

{#if isLogged}
  <Container>
    <h1>ID: {userInfo.id}</h1>
  </Container>
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
