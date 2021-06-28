<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { teacherModel } from '$lib/stores/models'
  import { collegeList, createModal, headerText, toast } from '$lib/stores/writable'
  import { del, get, post, put } from '$lib/utils/fetch'
  import { dateFormat, dateFormatInput } from '$lib/utils/format'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Col, Form, FormGroup, Icon, Input, Label, Row } from 'sveltestrap'

  let teachers: Array<Array<string | number | Date>> = null

  const removeTeacherModal = createModal()
  const changeTeacherModal = createModal()

  const currentTeacher = writable<TeacherInfo>({ ...teacherModel })

  const columns = [
    { name: 'ID' },
    { name: '姓名' },
    { name: '性别' },
    { name: '生日', formatter: (cell: TCell) => dateFormat(new Date(cell.toString()), '-') },
    { name: '学历' },
    { name: '职称' },
    { name: '入职时间', formatter: (cell: TCell) => dateFormat(new Date(cell.toString()), '-') },
    { name: '院系' },
    { name: '院系 ID', hidden: true },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) =>
        actionWrapper(
          action({
            text: '修改教师信息',
            icon: 'person',
            action: () => {
              setCurrentTeacher(row)
              changeTeacherModal.open('修改', 'primary')
            },
            color: 'primary'
          }),
          action({
            text: '删除',
            icon: 'person-x',
            action: () => {
              setCurrentTeacher(row)
              removeTeacherModal.open()
            },
            color: 'danger'
          })
        )
    }
  ]

  const setCurrentTeacher = (row: Row) => {
    const id = row.cells[0].data as string
    const name = row.cells[1].data as string
    const sex = row.cells[2].data as string
    const birth = dateFormatInput(new Date(row.cells[3].data))
    const degree = row.cells[4].data as string
    const title = row.cells[5].data as string
    const grade = dateFormatInput(new Date(row.cells[6].data))
    const college = {
      name: row.cells[7].data as string,
      id: row.cells[8].data as string
    }

    currentTeacher.set({ id, name, sex, birth, degree, title, grade, college })
  }

  const removeTeacher = () => {
    del<IBaseMessage | boolean>(`/api/teachers/${$currentTeacher.id}/`).then((result) => {
      if (result) {
        fetchTeachers()
        toast.open({
          title: '删除成功',
          body: `成功删除教师「${$currentTeacher.name}」的账号`,
          color: 'success',
          type: 'ok'
        })
        removeTeacherModal.close()
      }
    })
  }

  const changeTeacher = (e: Event) => {
    e.preventDefault()
    switch ($changeTeacherModal.type) {
      case '新建': {
        post<IAddTeacherRequest, IBaseMessage | boolean>(`/api/teachers/`, {
          userId: Number($currentTeacher.id),
          userName: $currentTeacher.name,
          sex: $currentTeacher.sex,
          birthYear: $currentTeacher.birth,
          degree: $currentTeacher.degree,
          title: $currentTeacher.title,
          grade: $currentTeacher.grade,
          collegeId: Number($currentTeacher.college.id)
        }).then((result) => {
          if (result) {
            fetchTeachers()
            toast.open({
              title: '添加成功',
              body: `成功添加教师「${$currentTeacher.name}」的信息`,
              color: 'success',
              type: 'ok'
            })
            changeTeacherModal.close()
          }
        })
        break
      }

      case '修改': {
        put<IEditTeacherRequest, IBaseMessage | boolean>(`/api/teachers/${$currentTeacher.id}/`, {
          userName: $currentTeacher.name,
          sex: $currentTeacher.sex,
          birthYear: $currentTeacher.birth,
          degree: $currentTeacher.degree,
          title: $currentTeacher.title,
          grade: $currentTeacher.grade,
          collegeId: Number($currentTeacher.college.id)
        }).then((result) => {
          if (result) {
            fetchTeachers()
            toast.open({
              title: '修改成功',
              body: `成功修改教师「${$currentTeacher.name}」的信息`,
              color: 'success',
              type: 'ok'
            })
            changeTeacherModal.close()
          }
        })
        break
      }
    }
  }

  const fetchTeachers = () => {
    get<IDataMessage<Array<ITeacherResponse>>>('/api/teachers/').then((res) => {
      teachers = res?.data.map((teacher) => [
        teacher.userId.toString(),
        teacher.userName,
        teacher.sex,
        new Date(teacher.birthYear),
        teacher.degree,
        teacher.title,
        new Date(teacher.grade),
        teacher.collegeName,
        teacher.collegeId.toString()
      ])
    })
  }

  const fetchColleges = () => {
    get<IDataMessage<Array<ICollegeResponse>>>('/api/colleges/').then((res) => {
      collegeList.create(res.data)
    })
  }

  onMount(() => {
    fetchTeachers()
    fetchColleges()
  })
  headerText.set('教师信息管理')
</script>

<svelte:head>
  <title>教师信息管理</title>
</svelte:head>

<Container>
  {#if teachers}
    <Grid {columns} data={teachers}>
      <Button
        color="success"
        class="me-2.5"
        on:click={() => {
          currentTeacher.set({ ...teacherModel })
          changeTeacherModal.open('新建', 'success')
        }}
      >
        <Icon name="person-plus" class="me-2" />
        新建教师信息
      </Button>
      <Button color="primary" on:click={() => fetchTeachers()}>
        <Icon name="arrow-clockwise" class="me-2" />
        刷新数据
      </Button>
    </Grid>

    <Modal isOpen={$removeTeacherModal.isOpen} toggle={removeTeacherModal.toggle}>
      <div slot="header">删除教师</div>
      <div slot="body">
        将会删除 <strong>{$currentTeacher.name}</strong> 的所有信息，此操作
        <strong>不可撤销</strong>，请谨慎操作
      </div>
      <div slot="footer">
        <Button color="danger" on:click={removeTeacher}>删除</Button>
      </div>
    </Modal>

    <Modal isOpen={$changeTeacherModal.isOpen} toggle={changeTeacherModal.toggle} size="md">
      <div slot="header">{$changeTeacherModal.type}教师信息</div>
      <div slot="body">
        <Form class="px-3 pt-3" on:submit={changeTeacher} id="change-teacher">
          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">教师 ID</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="number"
                  required
                  disabled={$changeTeacherModal.type === '修改'}
                  bind:value={$currentTeacher.id}
                  placeholder="教师 ID"
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
                  bind:value={$currentTeacher.name}
                  placeholder={$currentTeacher.name || '教师姓名'}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">性别</Label>
              </Col>
              <Col xs="8" class="d-flex flex-row gap-3 py-1.5">
                <Input type="radio" bind:group={$currentTeacher.sex} label="男" value="男" />
                <Input type="radio" bind:group={$currentTeacher.sex} label="女" value="女" />
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
                  required
                  bind:value={$currentTeacher.birth}
                  placeholder={$currentTeacher.birth}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">学历</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  bind:value={$currentTeacher.degree}
                  placeholder={$currentTeacher.degree || '教师学历'}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">职称</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  bind:value={$currentTeacher.title}
                  placeholder={$currentTeacher.title || '教师职称'}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">入职时间</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="date"
                  bind:value={$currentTeacher.grade}
                  placeholder={$currentTeacher.grade}
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
                <Input type="select" name="college-select" bind:value={$currentTeacher.college.id}>
                  <option value="0" selected={$currentTeacher.college.id === ''}>
                    未选择院系
                  </option>
                  {#each $collegeList as college}
                    <option value={college.id} selected={college.id === $currentTeacher.college.id}>
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
        <Button color={$changeTeacherModal.color || 'primary'} type="submit" form="change-teacher">
          {$changeTeacherModal.type}
        </Button>
      </div>
    </Modal>
  {/if}
</Container>
