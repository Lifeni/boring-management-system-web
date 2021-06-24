<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { post } from '$lib/utils/fetch'
  import { roleMap } from '$lib/utils/map'
  import { getRouter } from '$lib/utils/routers'
  import { isLogged, userInfo } from '$lib/utils/stores'
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Icon,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap'

  let isCurrentPage = (_url: string) => false
  page.subscribe((value) => {
    isCurrentPage = (url: string) => url === decodeURIComponent(value.path)
  })

  const handleLogout = () => {
    post<ILogoutRequest, void>('/api/auth/logout', { id: $userInfo.id })
      .catch(() => {})
      .finally(() => {
        goto('/登录')
        isLogged.logout()
        userInfo.logout()
      })
  }
</script>

<header class="d-flex py-2 align-items-center justify-content-between w-100">
  <Nav pills class="d-flex flex-fill align-items-center">
    <h1 class="fs-5 m-0 pe-5">一个教务管理系统</h1>
    {#each getRouter($userInfo.role) as router}
      <NavItem>
        {#if isCurrentPage(router.url)}
          <NavLink class="px-3 mx-3" href={router.url} active>
            {router.name}
          </NavLink>
        {:else}
          <NavLink href={router.url}>
            {router.name}
          </NavLink>
        {/if}
      </NavItem>
    {/each}
    <NavItem class="mx-1">
      <NavLink
        href="https://github.com/Lifeni/boring-management-system"
        target="_blank"
        rel="external"
      >
        <Icon name="github" />
      </NavLink>
    </NavItem>
  </Nav>
  <Dropdown>
    <DropdownToggle caret outline color="primary">
      <Icon name="person-circle" class="align-middle pe-2" />
      <span class="align-middle">{$userInfo.name}</span>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>
        ID {$userInfo.id} （{roleMap($userInfo.role)}）
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem href="/重置密码" class="fs-7">
        <Icon name="shield-lock" class="pe-2" />
        重置密码
      </DropdownItem>
      <DropdownItem on:click={handleLogout} class="fs-7">
        <Icon name="door-closed" class="pe-2" />
        退出登录
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</header>
