<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { headerText, modal, modalInput, toast } from '$lib/stores/writable'
  import { get, post } from '$lib/utils/fetch'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import { roleMap } from '$lib/utils/maps'
  import type Row from 'gridjs/dist/src/row'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { Button, Icon } from 'sveltestrap'

  let users: Array<Array<string | number>> = null

  const columns = [
    { name: '用户 ID' },
    { name: '用户名' },
    { name: '用户身份' },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) => {
        const id = Number(row.cells[0].data)
        const name = row.cells[1].data as string
        return actionWrapper(
          action({
            text: '重置密码',
            action: () => resetPassword(id, name),
            color: 'primary'
          }),
          action({
            text: '删除',
            action: () => deleteUser(id, name),
            color: 'danger'
          })
        )
      }
    }
  ]

  const resetPassword = (id: number, name: string) => {
    modal.close()
    modal.open({
      title: `重置用户密码`,
      body: `将会重置 <strong>${name}</strong> 的密码`,
      size: 'sm',
      action: () => action(),
      hasInput: true,
      inputPlaceholder: '输入新密码',
      isOpen: true
    })

    const action = () => {
      post(`/api/users/${id}/reset-password`, { password: $modalInput }).then(() => {
        toast.open({
          title: '操作成功',
          body: `成功重置用户「${name}」的密码`,
          color: 'primary',
          isOpen: true
        })
        modal.close()
      })
    }
  }

  const deleteUser = (id: number, name: string) => {
    modal.close()
    modal.open({
      title: `删除用户`,
      body: `将会删除 <strong>${name}</strong> 的所有信息，此操作 <strong>不可撤销</strong>，请谨慎操作`,
      size: 'sm',
      action: () => console.log(id),
      actionType: 'danger',
      actionText: '删除',
      isOpen: true
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
      <Button color="primary" outline on:click={() => fetchUsers()}>
        <Icon name="arrow-clockwise" />
        刷新数据
      </Button>
    </Grid>
    <Modal />
  {/if}
</Container>
