<script lang="ts">
  import { browser, dev } from '$app/env'
  import Container from '$lib/components/Container.svelte'
  import { weekMap } from '$lib/utils/map'
  import { userInfo } from '$lib/utils/stores'

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
  <title>一个教务管理系统</title>
</svelte:head>

<Container>
  <div class="p-5 h-100 d-flex flex-column">
    <h2 class="fs-1">欢迎回来，{$userInfo.name}</h2>
    <h3 class="fs-3 pt-3 pb-5">今天是 {getDate()}</h3>
    <section class="mt-5 mb-2 flex-fill d-flex flex-column justify-content-end">
      <span class="d-block py-1 fs-7 text-muted">
        #&nbsp;&nbsp;&nbsp;使用 SvelteKit 和 Bootstrap 构建
      </span>
      <span class="d-block py-1 fs-7 text-muted">
        #&nbsp;&nbsp;&nbsp;当前为{`「${dev ? '开发模式' : '正常模式'}」，页面在「${
          browser ? '浏览器' : '服务器'
        }」上进行渲染`}
      </span>
    </section>
  </div>
  <div class="pattern pattern-triangles-xl" />
</Container>

<style>
  .pattern {
    position: absolute;
    right: -3.5rem;
    bottom: 0;
    z-index: -1;
    width: 42%;
    height: 100vh;
    color: #f6f8fa;
  }
</style>
