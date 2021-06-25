<script lang="ts">
  import { goto } from '$app/navigation'
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { headerText, modal, toast } from '$lib/stores/writable'
  import { del, get } from '$lib/utils/fetch'
  import { dateFormat } from '$lib/utils/format'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type Row from 'gridjs/dist/src/row'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { Button, Icon } from 'sveltestrap'

  let students: Array<Array<string | number | Date>> = null

  const columns = [
    { name: '学生 ID' },
    { name: '姓名' },
    { name: '性别' },
    { name: '生日' },
    { name: '入学时间' },
    { name: '院系' },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) => {
        const id = Number(row.cells[0].data)
        const name = row.cells[1].data as string
        return actionWrapper(
          action({
            text: '编辑学生信息',
            action: () => goto(`/学生管理/${id}/编辑`),
            color: 'primary'
          }),
          action({
            text: '删除',
            action: () => deleteStudent(id, name),
            color: 'danger'
          })
        )
      }
    }
  ]

  const deleteStudent = (id: number, name: string) => {
    modal.close()
    modal.open({
      title: `删除用户`,
      body: `将会删除 <strong>${name}</strong> 的所有信息，此操作 <strong>不可撤销</strong>，请谨慎操作`,
      size: 'sm',
      action: () => action(),
      actionType: 'danger',
      actionText: '删除',
      isOpen: true
    })

    const action = () => {
      del<IBaseMessage | boolean>(`/api/student/${id}/`).then((result) => {
        if (result) {
          fetchStudents()
          toast.open({
            title: '操作成功',
            body: `成功删除学生「${name}」的账号`,
            color: 'danger',
            isOpen: true
          })
          modal.close()
        }
      })
    }
  }

  const fetchStudents = () => {
    get<IDataMessage<Array<Student>>>('/api/students/').then((res) => {
      students = res?.data.map((students) => [
        students.userId,
        students.userName,
        students.sex,
        dateFormat(new Date(students.birthYear), '-'),
        dateFormat(new Date(students.grade), '-'),
        students.collegeId
      ])
    })
  }

  onMount(() => fetchStudents())
  headerText.set('学生信息管理')
</script>

<svelte:head>
  <title>学生信息管理</title>
</svelte:head>

<Container>
  {#if students}
    <Grid {columns} data={students}>
      <Button color="success" class="me-2.5" on:click={() => goto('/学生管理/新建')}>
        <Icon name="person-plus" class="me-2" />
        新建学生信息
      </Button>
      <Button color="primary" on:click={() => fetchStudents()}>
        <Icon name="arrow-clockwise" class="me-2" />
        刷新数据
      </Button>
    </Grid>
    <Modal />
  {/if}
</Container>
