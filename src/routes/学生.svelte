<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { collegeModel, studentModel } from '$lib/stores/models'
  import { collegeList, createModal, headerText, toast } from '$lib/stores/writable'
  import { del, get } from '$lib/utils/fetch'
  import { dateFormat, dateFormatInput } from '$lib/utils/format'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Col, Form, FormGroup, Icon, Input, Label, Row } from 'sveltestrap'

  let students: Array<Array<string | number | Date>> = null

  const newStudentModal = createModal()
  const deleteStudentModal = createModal()
  const editStudentModal = createModal()

  const currentStudent = writable<StudentInfo>(studentModel)

  const columns = [
    { name: '学生 ID' },
    { name: '姓名' },
    { name: '性别' },
    { name: '生日', formatter: (cell: TCell) => dateFormat(new Date(cell.toString()), '-') },
    { name: '入学时间', formatter: (cell: TCell) => dateFormat(new Date(cell.toString()), '-') },
    { name: '院系' },
    { name: '院系 ID', hidden: true },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) =>
        actionWrapper(
          action({
            text: '修改学生信息',
            icon: 'person',
            action: () => {
              setCurrentStudent(row)
              editStudentModal.open()
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
    const id = row.cells[0].data as string
    const name = row.cells[1].data as string
    const sex = row.cells[2].data as string
    const birth = dateFormatInput(new Date(row.cells[3].data))
    const grade = dateFormatInput(new Date(row.cells[4].data))
    const college = {
      name: row.cells[5].data as string,
      id: row.cells[6].data as string
    }

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
        new Date(students.birthYear),
        new Date(students.grade),
        students.collegeName,
        students.collegeId
      ])
    })
  }

  const fetchColleges = () => {
    get<IDataMessage<Array<ICollegeResponse>>>('/api/colleges/').then((res) => {
      collegeList.create(res.data)
    })
  }

  onMount(() => {
    fetchStudents()
    fetchColleges()
  })
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

    <Modal isOpen={$editStudentModal} toggle={editStudentModal.toggle} size="md">
      <div slot="header">修改学生信息</div>
      <div slot="body">
        <Form class="px-3 pt-3">
          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">学生 ID</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="number"
                  disabled
                  bind:value={$currentStudent.id}
                  placeholder="学生 ID"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">姓名</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  bind:value={$currentStudent.name}
                  placeholder={$currentStudent.name}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">性别</Label>
              </Col>
              <Col xs="8" class="d-flex flex-row gap-3">
                <Input type="radio" bind:group={$currentStudent.sex} label="男" value="男" />
                <Input type="radio" bind:group={$currentStudent.sex} label="女" value="女" />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">生日</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="date"
                  bind:value={$currentStudent.birth}
                  placeholder={$currentStudent.birth}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">入学时间</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="date"
                  bind:value={$currentStudent.grade}
                  placeholder={$currentStudent.grade}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">院系</Label>
              </Col>
              <Col xs="8">
                <Input type="select" name="college-select" value="1">
                  {#each $collegeList as college}
                    <option value={college.id}>{college.name}</option>
                  {/each}
                </Input>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
      <div slot="footer">
        <Button color="primary" on:click={deleteStudent}>修改</Button>
      </div>
    </Modal>
  {/if}
</Container>
