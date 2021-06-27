<script lang="ts">
  import { browser, dev } from '$app/env'
  import { goto } from '$app/navigation'
  import Container from '$lib/components/Container.svelte'
  import { headerText, isLogged, userInfo } from '$lib/stores/writable'
  import { post } from '$lib/utils/fetch'
  import { dateFormatWeek } from '$lib/utils/format'
  import { fade } from 'svelte/transition'
  import { Button, Icon } from 'sveltestrap'

  const handleLogout = () => {
    post<ILogoutRequest, void>('/api/auth/logout', { id: Number($userInfo.id) })
      .catch(() => {})
      .finally(() => {
        goto('/登录')
        isLogged.logout()
        userInfo.logout()
      })
  }

  headerText.set('一个教务管理系统')
</script>

<svelte:head>
  <title>一个教务管理系统</title>
</svelte:head>

<Container>
  <div class="p-5 h-100 d-flex flex-column" in:fade={{ duration: 200 }}>
    <h2 class="fs-1 mt-4 ">欢迎回来，{$userInfo.name}</h2>
    <h3 class="fs-3 pt-3 pb-5">今天是 {dateFormatWeek(new Date())}</h3>
    <section class="py-2 d-flex flex-fill align-items-end">
      <Button class="me-2.5" color="primary" href="/修改密码">
        <Icon name="shield-lock" class="pe-2" />
        修改密码
      </Button>
      <Button color="danger" on:click={handleLogout}>
        <Icon name="door-closed" class="pe-2" />
        退出登录
      </Button>
    </section>
    <section class="my-3 d-flex flex-column justify-content-end">
      <span class="d-block py-1 text-muted">
        #&nbsp;&nbsp;&nbsp;使用 SvelteKit 和 Bootstrap 构建
      </span>
      <span class="d-block py-1 text-muted">
        #&nbsp;&nbsp;&nbsp;当前为{`「${dev ? '开发模式' : '正常模式'}」，页面在「${
          browser ? '浏览器' : '服务器'
        }」上进行渲染`}
      </span>
    </section>
  </div>
  <div class="background" in:fade={{ duration: 200 }} />
</Container>
