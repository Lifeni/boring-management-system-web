<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { studentModel } from '$lib/stores/models'
  import { createModal, headerText, toast } from '$lib/stores/writable'
  import { del, get } from '$lib/utils/fetch'
  import { dateFormat } from '$lib/utils/format'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type Row from 'gridjs/dist/src/row'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Icon } from 'sveltestrap'

  let students: Array<Array<string | number | Date>> = null

  let deleteStudentModal = createModal()
  let currentStudent = writable<StudentInfo>(studentModel)

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
      formatter: (_: TCell, row: Row) =>
        actionWrapper(
          action({
            text: '编辑学生信息',
            icon: 'person',
            action: () => {
              setCurrentStudent(row)
            },
            color: 'primary'
          }),
          action({
            text: '删除',
            icon: 'person-x',
            action: () => {
              setCurrentStudent(row)
              deleteStudentModal.open()
            },
            color: 'danger'
          })
        )
    }
  ]

  const setCurrentStudent = (row: Row) => {
    const id = Number(row.cells[0].data)
    const name = row.cells[1].data as string
    const sex = row.cells[2].data as string
    const birth = row.cells[3].data as string
    const grade = row.cells[4].data as string
    const college = row.cells[5].data as string
    currentStudent.set({ id, name, sex, birth, grade, college })
  }

  const deleteStudent = () => {
    del<IBaseMessage | boolean>(`/api/student/${$currentStudent.id}/`).then((result) => {
      if (result) {
        fetchStudents()
        toast.open({
          title: '操作成功',
          body: `成功删除学生「${$currentStudent.name}」的账号`,
          color: 'danger'
        })
        deleteStudentModal.close()
      }
    })
  }

  const fetchStudents = () => {
    get<IDataMessage<Array<IStudentResponse>>>('/api/students/').then((res) => {
      students = res?.data.map((students) => [
        students.userId,
        students.userName,
        students.sex,
        dateFormat(new Date(students.birthYear), '-'),
        dateFormat(new Date(students.grade), '-'),
        students.collegeName
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
      <Button color="success" class="me-2.5" on:click={() => {}}>
        <Icon name="person-plus" class="me-2" />
        新建学生信息
      </Button>
      <Button color="primary" on:click={() => fetchStudents()}>
        <Icon name="arrow-clockwise" class="me-2" />
        刷新数据
      </Button>
    </Grid>

    <Modal isOpen={$deleteStudentModal} toggle={deleteStudentModal.toggle}>
      <div slot="header">删除学生</div>
      <div slot="body">
        将会删除 <strong>{$currentStudent.name}</strong> 的所有信息，此操作
        <strong>不可撤销</strong>，请谨慎操作
      </div>
      <div slot="footer">
        <Button color="danger" on:click={deleteStudent}>删除</Button>
      </div>
    </Modal>
  {/if}
</Container>
