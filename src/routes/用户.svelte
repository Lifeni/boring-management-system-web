<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { createModal, headerText, toast } from '$lib/stores/writable'
  import { del, get, post } from '$lib/utils/fetch'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import { roleMap } from '$lib/utils/maps'
  import type Row from 'gridjs/dist/src/row'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Icon, Input } from 'sveltestrap'

  let users: Array<Array<string | number>> = null

  let deleteUserModal = createModal()

  let resetPasswordModal = createModal()
  let resetPasswordInput = ''

  let currentUser = writable<UserInfo>(null)

  const columns = [
    { name: '用户 ID' },
    { name: '用户名' },
    { name: '用户身份' },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) =>
        actionWrapper(
          action({
            text: '重置密码',
            action: () => {
              setCurrentUser(row)
              resetPasswordModal.open()
            },
            color: 'warning'
          }),
          action({
            text: '删除',
            action: () => {
              setCurrentUser(row)
              deleteUserModal.open()
            },
            color: 'danger'
          })
        )
    }
  ]

  const setCurrentUser = (row: Row) => {
    const id = Number(row.cells[0].data)
    const name = row.cells[1].data as string
    const role = Number(row.cells[2].data)
    currentUser.set({ id, name, role })
  }

  const resetPassword = () => {
    post<IResetPasswordRequestByAdmin, IBaseMessage | boolean>(
      `/api/users/${$currentUser.id}/reset-password`,
      { password: resetPasswordInput }
    ).then((result) => {
      if (result) {
        toast.open({
          title: '操作成功',
          body: `成功重置用户「${$currentUser.name}」的密码`
        })
        resetPasswordModal.close()
      }
    })
  }

  const deleteUser = () => {
    del<IBaseMessage | boolean>(`/api/users/${$currentUser.id}/`).then((result) => {
      if (result) {
        fetchUsers()
        toast.open({
          title: '操作成功',
          body: `成功删除用户「${$currentUser.name}」的账号`
        })
        deleteUserModal.close()
      }
    })
  }

  const fetchUsers = () => {
    get<IDataMessage<Array<IUserResponse>>>('/api/users/').then((res) => {
      users = res?.data.map((user) => [user.userId, user.userName, roleMap(user.role)])
    })
  }

  onMount(() => fetchUsers())
  headerText.set('用户账户管理')
</script>

<svelte:head>
  <title>用户账户管理</title>
</svelte:head>

<Container>
  {#if users}
    <Grid {columns} data={users}>
      <Button color="primary" on:click={() => fetchUsers()}>
        <Icon name="arrow-clockwise" />
        刷新数据
      </Button>
    </Grid>

    <Modal isOpen={$deleteUserModal} toggle={deleteUserModal.toggle}>
      <div slot="header">删除用户</div>
      <div slot="body">
        将会删除 <strong>{$currentUser.name}</strong> 的所有信息，此操作
        <strong>不可撤销</strong>，请谨慎操作
      </div>
      <div slot="footer">
        <Button color="danger" on:click={deleteUser}>删除</Button>
      </div>
    </Modal>

    <Modal isOpen={$resetPasswordModal} toggle={resetPasswordModal.toggle}>
      <div slot="header">重置用户密码</div>
      <div slot="body">
        将会重置 <strong>{$currentUser.name}</strong> 的密码
        <Input
          class="mt-3"
          type="text"
          placeholder="输入新的密码"
          autofocus
          bind:value={resetPasswordInput}
        />
      </div>
      <div slot="footer">
        <Button color="warning" on:click={resetPassword}>重置</Button>
      </div>
    </Modal>
  {/if}
</Container>
