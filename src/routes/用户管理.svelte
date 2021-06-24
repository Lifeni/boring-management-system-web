<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import { gridOptions } from '$lib/stores/readable'
  import { headerText } from '$lib/stores/writable'
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
    '用户权限',
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) => {
        const id = Number(row.cells[0].data)
        return actionWrapper(
          action({
            text: '重置密码',
            action: () => resetPassword(id),
            color: 'primary'
          }),
          action({
            text: '删除',
            action: () => deleteUser(id),
            color: 'danger'
          })
        )
      }
    }
  ]

  const resetPassword = (id: number) => {
    console.log(id)
  }

  const deleteUser = (id: number) => {
    console.log(id)
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
    <div class="p-5 pt-3 my-1">
      <Grid {columns} data={users} {...$gridOptions} />
    </div>
  {/if}
</Container>
