<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { headerText, isLogged, userInfo } from '$lib/stores/writable'
  import { post } from '$lib/utils/fetch'
  import { getNav } from '$lib/utils/nav-links'
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

  $: isCurrentPage = (url: string) =>
    url === '/'
      ? '/' === decodeURIComponent($page.path)
      : decodeURIComponent($page.path).startsWith(url)

  const handleLogout = () => {
    post<ILogoutRequest, void>('/api/auth/logout', { id: Number($userInfo.id) })
      .catch(() => {})
      .finally(() => {
        goto('/登录')
        isLogged.logout()
        userInfo.logout()
      })
  }
</script>

<header class="d-flex py-3 align-items-center justify-content-between w-100">
  <Nav pills class="d-flex flex-fill align-items-center">
    <h1 class="fs-5 m-0 pe-5 header-text">{$headerText}</h1>
    {#each getNav(Number($userInfo.role.id)) as nav}
      <NavItem>
        {#if isCurrentPage(nav.url)}
          <NavLink class="mx-3" href={nav.url} active>
            {nav.name}
          </NavLink>
        {:else}
          <NavLink href={nav.url}>
            {nav.name}
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
  {#if $page.path !== '/'}
    <Dropdown>
      <DropdownToggle caret outline color="primary" class="d-flex align-items-center">
        <Icon name="person-circle" class="align-middle pe-2" />
        <span class="align-middle mx-1">{$userInfo.name}</span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header class="fs-6">
          ID {$userInfo.id} （{$userInfo.role.name}）
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem href="/修改密码">
          <Icon name="shield-lock" class="pe-2" />
          修改密码
        </DropdownItem>
        <DropdownItem on:click={handleLogout}>
          <Icon name="door-closed" class="pe-2" />
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  {/if}
</header>
