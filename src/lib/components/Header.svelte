<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { createModal, headerText, isLogged, toast, userInfo } from '$lib/stores/writable'
  import { del, post } from '$lib/utils/fetch'
  import { getNav } from '$lib/utils/nav-links'
  import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Icon,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap'
  import Modal from './Modal.svelte'

  $: isCurrentPage = (url: string) =>
    decodeURIComponent($page.path + window.location.search).endsWith(url)

  let removeUserModal = createModal()

  const handleLogout = () => {
    post('/api/auth/logout').then(() => {
      goto('/登录')
      isLogged.logout()
      userInfo.logout()
    })
  }

  const handleDeleteAccount = () => {
    del(`/api/users/${$userInfo.id}/`).then(() => {
      goto('/登录')
      isLogged.logout()
      userInfo.logout()
      toast.open({
        title: '删除账号成功',
        body: 'See you again',
        color: 'success',
        type: 'ok'
      })
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

        {#if $userInfo.role.id !== '0'}
          <DropdownItem on:click={() => removeUserModal.open()}>
            <Icon name="trash2" class="pe-2" />
            删除账号
          </DropdownItem>
        {/if}

        <DropdownItem on:click={handleLogout}>
          <Icon name="door-closed" class="pe-2" />
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  {/if}

  <Modal isOpen={$removeUserModal.isOpen} toggle={removeUserModal.toggle}>
    <div slot="header">删除账号</div>
    <div slot="body">
      将会删除 <strong>{$userInfo.name}</strong> 的所有信息，此操作
      <strong>不可撤销</strong>，请谨慎操作
    </div>
    <div slot="footer">
      <Button color="danger" on:click={handleDeleteAccount}>删除</Button>
    </div>
  </Modal>
</header>
