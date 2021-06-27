<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { createModal, headerText, toast } from '$lib/stores/writable'
  import { del, get, post } from '$lib/utils/fetch'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type Row from 'gridjs/dist/src/row'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Form, Icon, Input } from 'sveltestrap'

  let users: Array<Array<string | number>> = null

  let removeUserModal = createModal()
  let resetPasswordModal = createModal()
  let resetPasswordInput = ''

  let currentUser = writable<UserInfo>(null)

  const columns = [
    { name: '用户 ID' },
    { name: '用户名（学生或教师 ID）' },
    { name: '用户身份' },
    { name: '用户身份 ID', hidden: true },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) =>
        actionWrapper(
          action({
            text: '重置密码',
            icon: 'eraser',
            action: () => {
              setCurrentUser(row)
              resetPasswordInput = ''
              resetPasswordModal.open()
            },
            color: 'warning'
          }),
          action({
            text: '删除',
            icon: 'person-x',
            action: () => {
              setCurrentUser(row)
              removeUserModal.open()
            },
            color: 'danger'
          })
        )
    }
  ]

  const setCurrentUser = (row: Row) => {
    const id = row.cells[0].data as string
    const name = row.cells[1].data as string
    const role = { name: row.cells[2].data as string, id: row.cells[3].data as string }
    currentUser.set({ id, name, role })
  }

  const resetPassword = (e: Event) => {
    e.preventDefault()
    post<IResetPasswordByAdminRequest, IBaseMessage | boolean>(
      `/api/users/${$currentUser.id}/reset-password`,
      { password: resetPasswordInput }
    ).then((result) => {
      if (result) {
        toast.open({
          title: '重置成功',
          body: `成功重置用户「${$currentUser.name}」的密码`,
          color: 'success',
          type: 'ok'
        })
        resetPasswordModal.close()
      }
    })
  }

  const removeUser = () => {
    del<IBaseMessage | boolean>(`/api/users/${$currentUser.id}/`).then((result) => {
      if (result) {
        fetchUsers()
        toast.open({
          title: '删除成功',
          body: `成功删除用户「${$currentUser.name}」的账号`,
          color: 'success',
          type: 'ok'
        })
        removeUserModal.close()
      }
    })
  }

  const fetchUsers = () => {
    get<IDataMessage<Array<IUserResponse>>>('/api/users/').then((res) => {
      users = res?.data.map((user) => [user.userId, user.userName, user.roleName, user.roleId])
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

    <Modal isOpen={$removeUserModal.isOpen} toggle={removeUserModal.toggle}>
      <div slot="header">删除用户</div>
      <div slot="body">
        将会删除 <strong>{$currentUser.name}</strong> 的所有信息，此操作
        <strong>不可撤销</strong>，请谨慎操作
      </div>
      <div slot="footer">
        <Button color="danger" on:click={removeUser}>删除</Button>
      </div>
    </Modal>

    <Modal isOpen={$resetPasswordModal.isOpen} toggle={resetPasswordModal.toggle}>
      <div slot="header">重置用户密码</div>
      <div slot="body">
        <Form on:submit={resetPassword} id="reset-password">
          将会重置 <strong>{$currentUser.name}</strong> 的密码，请在下面输入新的密码
          <Input
            class="mt-3"
            type="text"
            required
            placeholder="输入新的密码"
            autofocus
            bind:value={resetPasswordInput}
          />
        </Form>
      </div>
      <div slot="footer">
        <Button color="warning" form="reset-password">重置</Button>
      </div>
    </Modal>
  {/if}
</Container>
