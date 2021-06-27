<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { studentModel } from '$lib/stores/models'
  import { collegeList, createModal, headerText, toast } from '$lib/stores/writable'
  import { del, get, post, put } from '$lib/utils/fetch'
  import { dateFormat, dateFormatInput } from '$lib/utils/format'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Col, Form, FormGroup, Icon, Input, Label, Row } from 'sveltestrap'

  let students: Array<Array<string | number | Date>> = null

  const removeStudentModal = createModal()
  const changeStudentModal = createModal()

  const currentStudent = writable<StudentInfo>({ ...studentModel })

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
              changeStudentModal.open('修改', 'primary')
            },
            color: 'primary'
          }),
          action({
            text: '删除',
            icon: 'person-x',
            action: () => {
              setCurrentStudent(row)
              removeStudentModal.open()
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

  const removeStudent = () => {
    del<IBaseMessage | boolean>(`/api/students/${$currentStudent.id}/`).then((result) => {
      if (result) {
        fetchStudents()
        toast.open({
          title: '删除成功',
          body: `成功删除学生「${$currentStudent.name}」的账号`,
          color: 'success',
          type: 'ok'
        })
        removeStudentModal.close()
      }
    })
  }

  const changeStudent = (e: Event) => {
    e.preventDefault()
    switch ($changeStudentModal.type) {
      case '新建': {
        post<IAddStudentRequest, IBaseMessage | boolean>(`/api/students/`, {
          userId: Number($currentStudent.id),
          userName: $currentStudent.name,
          sex: $currentStudent.sex,
          birthYear: $currentStudent.birth,
          grade: $currentStudent.grade,
          collegeId: Number($currentStudent.college.id)
        }).then((result) => {
          if (result) {
            fetchStudents()
            toast.open({
              title: '添加成功',
              body: `成功添加学生「${$currentStudent.name}」的信息`,
              color: 'success',
              type: 'ok'
            })
            changeStudentModal.close()
          }
        })
        break
      }

      case '修改': {
        put<IEditStudentRequest, IBaseMessage | boolean>(`/api/students/${$currentStudent.id}/`, {
          userName: $currentStudent.name,
          sex: $currentStudent.sex,
          birthYear: $currentStudent.birth,
          grade: $currentStudent.grade,
          collegeId: Number($currentStudent.college.id)
        }).then((result) => {
          if (result) {
            fetchStudents()
            toast.open({
              title: '修改成功',
              body: `成功修改学生「${$currentStudent.name}」的信息`,
              color: 'success',
              type: 'ok'
            })
            changeStudentModal.close()
          }
        })
        break
      }
    }
  }

  const fetchStudents = () => {
    get<IDataMessage<Array<IStudentResponse>>>('/api/students/').then((res) => {
      students = res?.data.map((students) => [
        students.userId.toString(),
        students.userName,
        students.sex,
        new Date(students.birthYear),
        new Date(students.grade),
        students.collegeName,
        students.collegeId.toString()
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
      <Button
        color="success"
        class="me-2.5"
        on:click={() => {
          currentStudent.set({ ...studentModel })
          changeStudentModal.open('新建', 'success')
        }}
      >
        <Icon name="person-plus" class="me-2" />
        新建学生信息
      </Button>
      <Button color="primary" on:click={() => fetchStudents()}>
        <Icon name="arrow-clockwise" class="me-2" />
        刷新数据
      </Button>
    </Grid>

    <Modal isOpen={$removeStudentModal.isOpen} toggle={removeStudentModal.toggle}>
      <div slot="header">删除学生</div>
      <div slot="body">
        将会删除 <strong>{$currentStudent.name}</strong> 的所有信息，此操作
        <strong>不可撤销</strong>，请谨慎操作
      </div>
      <div slot="footer">
        <Button color="danger" on:click={removeStudent}>删除</Button>
      </div>
    </Modal>

    <Modal isOpen={$changeStudentModal.isOpen} toggle={changeStudentModal.toggle} size="md">
      <div slot="header">{$changeStudentModal.type}学生信息</div>
      <div slot="body">
        <Form class="px-3 pt-3" on:submit={changeStudent} id="change-student">
          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">学生 ID</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="number"
                  required
                  disabled={$changeStudentModal.type === '修改'}
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
                  required
                  bind:value={$currentStudent.name}
                  placeholder={$currentStudent.name || '学生姓名'}
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
                <Input type="select" name="college-select" bind:value={$currentStudent.college.id}>
                  <option value="0" selected={$currentStudent.college.id === ''}>
                    未选择院系
                  </option>
                  {#each $collegeList as college}
                    <option value={college.id} selected={college.id === $currentStudent.college.id}>
                      {college.name}
                    </option>
                  {/each}
                </Input>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
      <div slot="footer">
        <Button color={$changeStudentModal.color || 'primary'} form="change-student">
          {$changeStudentModal.type}
        </Button>
      </div>
    </Modal>
  {/if}
</Container>
