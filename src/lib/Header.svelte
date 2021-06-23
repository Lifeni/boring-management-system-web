<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Icon } from 'sveltestrap'
  import { post } from '../utils/fetch'
  import { roleMap } from '../utils/map'
  import { userModel } from '../utils/models'
  import { user } from '../utils/stores'

  let userInfo: UserInfo

  const unsubscribe = user.subscribe((value) => (userInfo = value.userInfo))

  const handleLogout = () => {
    post<LogoutRequest, IBaseMessage>('/api/auth/logout', { id: userInfo.id }).finally(() => {
      user.set(userModel)
      console.log('退出登录')
    })
  }

  onDestroy(() => {
    unsubscribe()
  })
</script>

<header class="d-flex align-items-center justify-content-between w-100">
  <h1 class="fs-5 fw-light">一个教务管理系统</h1>
  <Dropdown>
    <DropdownToggle caret outline color="primary">
      <Icon name="person-circle" class="pe-2" />
      <span class="fw-light">{userInfo.name}</span>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header class="fw-light">
        ID {userInfo.id} （{roleMap(userInfo.role)}）
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem href="/重置密码" class="fw-light">
        <Icon name="shield-lock" class="pe-2" />
        重置密码
      </DropdownItem>
      <DropdownItem on:click={handleLogout} class="fw-light">
        <Icon name="door-closed" class="pe-2" />
        退出登录
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</header>
