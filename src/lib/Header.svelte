<script>
  import { onDestroy, onMount } from 'svelte'
  import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'sveltestrap'
  import { user } from '../utils/stores'

  let isLogged
  let userInfo

  const unsubscribe = user.subscribe((value) => {
    isLogged = value.isLogged
    userInfo = value.userInfo
  })

  onMount(() => {
    if (!isLogged) {
      window.location.reload()
    }
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<header class="d-flex align-items-center justify-content-between w-100">
  <h1 class="fs-5">一个教务管理系统</h1>
  <Dropdown>
    <DropdownToggle caret>{userInfo.name}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>Header</DropdownItem>
      <DropdownItem>Some Action</DropdownItem>
      <DropdownItem disabled>Action (disabled)</DropdownItem>
      <DropdownItem divider />
      <DropdownItem>Foo Action</DropdownItem>
      <DropdownItem>Bar Action</DropdownItem>
      <DropdownItem>Quo Action</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</header>
