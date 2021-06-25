<script lang="ts">
  import { browser, dev } from '$app/env'
  import Container from '$lib/components/Container.svelte'
  import { headerText, userInfo } from '$lib/stores/writable'
  import { dateFormatWeek } from '$lib/utils/format'

  headerText.set('一个教务管理系统')
</script>

<svelte:head>
  <title>一个教务管理系统</title>
</svelte:head>

<Container>
  <div class="p-5 h-100 d-flex flex-column">
    <h2 class="fs-1 mt-5 ">欢迎回来，{$userInfo.name}</h2>
    <h3 class="fs-3 pt-3 pb-5">今天是 {dateFormatWeek(new Date())}</h3>
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
