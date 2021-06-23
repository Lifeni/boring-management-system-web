<script lang="ts">
  import { goto } from '$app/navigation'
  import { post } from '$lib/utils/fetch'
  import { roleMap, featureMap } from '$lib/utils/map'
  import { userModel } from '$lib/utils/models'
  import { isLogged, userInfo } from '$lib/utils/stores'
  import {
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Icon
  } from 'sveltestrap'

  const path = window.location.pathname
  const isCurrentPage = (url: string) => url === decodeURIComponent(path)

  const handleLogout = () => {
    post<LogoutRequest, IBaseMessage>('/api/auth/logout', { id: $userInfo.id }).finally(() => {
      isLogged.set(false)
      userInfo.set(userModel)
      goto('/')
    })
  }
</script>

<header class="d-flex align-items-center justify-content-between w-100">
  <Nav pills class="d-flex align-items-center">
    <h1 class="fs-4 m-0 pe-5">一个教务管理系统</h1>
    {#each featureMap($userInfo.role) as feature}
      <NavItem>
        {#if isCurrentPage(feature.url)}
          <NavLink class="px-3 mx-3" href={feature.url} active>
            {feature.name}
          </NavLink>
        {:else}
          <NavLink href={feature.url}>
            {feature.name}
          </NavLink>
        {/if}
      </NavItem>
    {/each}
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
