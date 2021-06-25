<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Modals from '$lib/components/Modals.svelte'
  import { gridOptions } from '$lib/stores/readable'
  import { headerText, modals } from '$lib/stores/writable'
  import { get } from '$lib/utils/fetch'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import { roleMap } from '$lib/utils/maps'
  import Grid from 'gridjs-svelte'
  import type Row from 'gridjs/dist/src/row'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'

  let users: Array<Array<string | number>> = null

  const columns = [
    '用户 ID',
    '用户名',
    '用户身份',
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
    modals.close()
    modals.open({
      title: `重置用户密码`,
      body: `将会重置 <strong>${name}</strong> 的密码`,
      size: 'sm',
      action: () => console.log(id),
      hasInput: true,
      inputPlaceholder: '输入新密码',
      isOpen: true
    })
  }

  const deleteUser = (id: number, name: string) => {
    modals.close()
    modals.open({
      title: `删除用户`,
      body: `将会删除 <strong>${name}</strong> 的所有信息，此操作 <strong>不可撤销</strong>，请谨慎操作`,
      size: 'sm',
      action: () => console.log(id),
      actionType: 'danger',
      actionText: '删除',
      isOpen: true
    })
  }

  onMount(() => {
    get<IDataMessage<Array<IUserResponse>>>('/api/user/').then((res) => {
      users = res.data.map((user) => [user.userId, user.userName, roleMap(user.role)])
    })
  })

  headerText.set('用户账户管理')
</script>

<svelte:head>
  <title>用户账户管理</title>
</svelte:head>

<Container>
  {#if users}
    <div class="p-5">
      <Grid {columns} data={users} {...$gridOptions} />
    </div>

    <Modals />
  {/if}
</Container>
