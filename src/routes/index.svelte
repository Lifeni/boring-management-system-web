<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import LoginBox from '$lib/components/LoginBox.svelte'
  import { weekMap } from '$lib/utils/map'
  import { isLogged, userInfo } from '$lib/utils/stores'
  import { Button } from 'sveltestrap'

  const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = date.getDay()
    return `${year} 年 ${month} 月 ${day} 日，${weekMap(week)}`
  }
</script>

<svelte:head>
  {#if $isLogged}
    <title>一个教务管理系统</title>
  {:else}
    <title>登录 | 一个教务管理系统</title>
  {/if}
</svelte:head>

{#if $isLogged}
  <Container>
    <div class="p-5 h-100 d-flex flex-column">
      <h2 class="fs-1">欢迎回来，{$userInfo.name}</h2>
      <h3 class="fs-3 pt-3 pb-5">今天是 {getDate()}</h3>
      <section class="mt-5 flex-fill d-flex align-items-end">
        <blockquote class="fs-7 text-muted">Powered by SvelteKit & Bootstrap</blockquote>
      </section>
    </div>
    <div class="pattern pattern-triangles-xl" />
  </Container>
{:else}
  <main class="h-100 d-flex justify-content-evenly align-items-center">
    <section class="text-center">
      <h1 class="fs-3">一个教务管理系统</h1>
      <p class="fs-5 mb-3">
        <code>boring-management-system</code>
      </p>
    </section>
    <LoginBox />
  </main>
{/if}

<style>
  .pattern {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: -1;
    width: 42vw;
    height: 100vh;
    color: #f6f8fa;
  }
</style>
