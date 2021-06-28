<script lang="ts">
  import { page } from '$app/stores'
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { courseModel } from '$lib/stores/models'
  import { collegeList, createModal, headerText, toast, userInfo } from '$lib/stores/writable'
  import { del, get, patch, post, put } from '$lib/utils/fetch'
  import { dateFormat } from '$lib/utils/format'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type { TCell, TColumn } from 'gridjs/dist/src/types'
  import { writable } from 'svelte/store'
  import { Button, Col, Column, Form, FormGroup, Icon, Input, Label, Row, Table } from 'sveltestrap'
  import Gridjs from 'gridjs-svelte'
  import { gridOptions } from '$lib/stores/readable'

  let courses: Array<CourseArray> = null
  let courseStudentList: Array<Array<string>> = null

  const removeCourseModal = createModal()
  const changeCourseModal = createModal()
  const studentListCourseModal = createModal()

  const currentCourse = writable<CourseInfo>({ ...courseModel })

  $: filter = $page.query.get('筛选') || '所有课程'
  $: actions = {
    name: '操作',
    sort: { enabled: false },
    hidden: $userInfo.role.id === '2' && filter === '已修完课程',
    formatter: (_: TCell, row: Row) => {
      switch ($userInfo.role.id) {
        case '0': {
          return actionWrapper(
            action({
              text: '修改',
              icon: 'calendar2-week',
              action: () => {
                setCurrentCourse(row)
                changeCourseModal.open('修改', 'primary')
              },
              color: 'primary'
            }),
            action({
              text: '删除',
              icon: 'calendar2-x',
              action: () => {
                setCurrentCourse(row)
                removeCourseModal.open()
              },
              color: 'danger'
            })
          )
        }

        case '1': {
          return actionWrapper(
            action({
              text: '查看选课学生',
              icon: 'people',
              action: () => {
                const id = row.cells[0].data as string
                fetchStudentList(id)
                setCurrentCourse(row)
                studentListCourseModal.open()
              },
              color: 'success'
            })
          )
        }

        case '2': {
          const isSelected = row.cells[12].data as boolean
          const isFinished = row.cells[13].data as boolean

          if (isFinished || (isSelected && filter === '所有课程')) {
            return actionWrapper(
              action({
                text: '已选',
                icon: 'calendar2-check',
                color: 'success',
                disabled: true
              })
            )
          }

          if (isSelected) {
            return actionWrapper(
              action({
                text: '退选',
                icon: 'calendar2-minus',
                action: () => {
                  const id = row.cells[0].data as string
                  const name = row.cells[1].data as string
                  del<IBaseMessage | boolean>(`/api/courses/${id}/students/${$userInfo.id}/`).then(
                    () => {
                      fetchCourses()
                      toast.open({
                        title: '取消选课成功',
                        body: `成功退选课程「${name}」`,
                        color: 'success',
                        type: 'ok'
                      })
                    }
                  )
                },
                color: 'danger'
              })
            )
          }

          return actionWrapper(
            action({
              text: '选课',
              icon: 'calendar2-check',
              action: () => {
                const id = row.cells[0].data as string
                const name = row.cells[1].data as string
                put<null, IBaseMessage | boolean>(
                  `/api/courses/${id}/students/${$userInfo.id}/`
                ).then(() => {
                  fetchCourses()
                  toast.open({
                    title: '选课成功',
                    body: `成功选择课程「${name}」`,
                    color: 'success',
                    type: 'ok'
                  })
                })
              },
              color: 'success'
            })
          )
        }
      }
    }
  }

  const common = [
    { name: 'ID' },
    { name: '课程名称' },
    { name: '教师 ID', hidden: true },
    { name: '教师', hidden: $userInfo.role.id === '1' },
    { name: '时间' },
    { name: '地点' },
    { name: '周数' },
    { name: '类型' },
    { name: '学分' },
    { name: '院系 ID', hidden: true },
    { name: '院系' }
  ]

  $: columns =
    $userInfo.role.id === '2'
      ? [
          ...common,
          {
            name: '成绩',
            hidden: filter !== '已修完课程',
            formatter: (cell: TCell, row: Row) => {
              return actionWrapper(
                action({
                  text: cell.toString(),
                  color: 'light',
                  disabled: true,
                  bold: true
                })
              )
            }
          },
          { name: '是否已选课', hidden: true },
          { name: '是否已修完', hidden: true },
          actions
        ]
      : [...common, actions]

  const setCurrentCourse = (row: Row) => {
    const id = row.cells[0].data as string
    const name = row.cells[1].data as string
    const teacher = { id: row.cells[2].data as string, name: row.cells[3].data as string }
    const time = row.cells[4].data as string
    const room = row.cells[5].data as string
    const week = row.cells[6].data as string
    const type = row.cells[7].data as string
    const score = row.cells[8].data as string
    const college = { id: row.cells[9].data as string, name: row.cells[10].data as string }

    currentCourse.set({ id, name, teacher, time, room, week, type, college, score })
  }

  const studentListColumns = [
    { name: 'ID', slug: 'id' },
    { name: '姓名', slug: 'name' },
    { name: '成绩', slug: 'mark' },
    { name: '操作' }
  ]

  const removeCourse = () => {
    del<IBaseMessage | boolean>(`/api/courses/${$currentCourse.id}/`).then((result) => {
      if (result) {
        fetchCourses()
        toast.open({
          title: '删除成功',
          body: `成功删除课程「${$currentCourse.name}」的信息`,
          color: 'success',
          type: 'ok'
        })
        removeCourseModal.close()
      }
    })
  }

  const changeCourse = (e: Event) => {
    e.preventDefault()
    switch ($changeCourseModal.type) {
      case '新建': {
        post<IAddCourseRequest, IBaseMessage | boolean>(`/api/courses/`, {
          courseId: Number($currentCourse.id),
          courseName: $currentCourse.name,
          teacherId: Number($currentCourse.teacher.id),
          courseTime: $currentCourse.time,
          classRoom: $currentCourse.room,
          courseWeek: Number($currentCourse.week),
          courseType: $currentCourse.type,
          collegeId: Number($currentCourse.college.id),
          score: Number($currentCourse.score)
        }).then((result) => {
          if (result) {
            fetchCourses()
            toast.open({
              title: '添加成功',
              body: `成功添加课程「${$currentCourse.name}」的信息`,
              color: 'success',
              type: 'ok'
            })
            changeCourseModal.close()
          }
        })
        break
      }

      case '修改': {
        put<IEditCourseRequest, IBaseMessage | boolean>(`/api/courses/${$currentCourse.id}/`, {
          courseName: $currentCourse.name,
          teacherId: Number($currentCourse.teacher.id),
          courseTime: $currentCourse.time,
          classRoom: $currentCourse.room,
          courseWeek: Number($currentCourse.week),
          courseType: $currentCourse.type,
          collegeId: Number($currentCourse.college.id),
          score: Number($currentCourse.score)
        }).then((result) => {
          if (result) {
            fetchCourses()
            toast.open({
              title: '修改成功',
              body: `成功修改课程「${$currentCourse.name}」的信息`,
              color: 'success',
              type: 'ok'
            })
            changeCourseModal.close()
          }
        })
        break
      }
    }
  }

  const fetchCourses = async () => {
    const role = $userInfo.role.id
    const user = $userInfo.id

    const list = (course: ICourseResponse | IStudentCourseResponse) => [
      course.courseId,
      course.courseName,
      course.teacherId,
      course.teacherName,
      course.courseTime,
      course.classRoom,
      course.courseWeek,
      course.courseType,
      course.score,
      course.collegeId.toString(),
      course.collegeName
    ]

    switch (role) {
      case '0': {
        const fetchUrl = '/api/courses/'
        get<IDataMessage<Array<ICourseResponse>>>(fetchUrl).then((res) => {
          courses = res?.data.map((course) => [...list(course)])
        })
        break
      }
      case '1': {
        const fetchUrl = `/api/courses/teachers/${user}/`
        get<IDataMessage<Array<ICourseResponse>>>(fetchUrl).then((res) => {
          courses = res?.data.map((course) => [...list(course)])
        })
        break
      }
      case '2': {
        const fetchUrl = `/api/courses/students/${user}/`
        get<IDataMessage<Array<IStudentCourseResponse>>>(fetchUrl).then((res) => {
          courses = res?.data
            .map((course) => {
              if (filter === '已选课程' && (!course.selected || course.finished)) {
                return null
              } else if (filter === '已修完课程' && !course.finished) {
                return null
              }

              return [...list(course), course.mark, course.selected, course.finished]
            })
            .filter((r) => r !== null)
        })
        break
      }
    }
  }

  const fetchColleges = async () => {
    get<IDataMessage<Array<ICollegeResponse>>>('/api/colleges/').then((res) => {
      collegeList.create(res?.data)
    })
  }

  const fetchStudentList = (id: string) => {
    get<IDataMessage<Array<ICourseStudentListResponse>>>(`/api/courses/${id}/students/`).then(
      (res) => {
        courseStudentList = res?.data.map((student) => [
          student.userId.toString(),
          student.userName,
          student.mark.toString(),
          student.marked.toString()
        ])
      }
    )
  }

  let markInput = {}

  const markStudent = (id: string) => {
    patch(`/api/courses/${$currentCourse.id}/students/${id}/mark/`, { mark: markInput[id] }).then(
      () => {
        fetchStudentList($currentCourse.id)
      }
    )
    markInput[id] = ''
  }

  const mouted = async () => {
    await fetchColleges()
    await fetchCourses()
  }

  $: $userInfo.id && mouted()
  $: filter && fetchCourses()
  $: headerText.set(`课程管理${$userInfo.role.name && `（${$userInfo.role.name}）`}`)
</script>

<svelte:head>
  <title>课程管理{$userInfo.role.name && `（${$userInfo.role.name}）`}</title>
</svelte:head>

<Container>
  {#if courses}
    <Grid {columns} data={courses}>
      {#if $userInfo.role.id === '0'}
        <Button
          color="success"
          class="me-2.5"
          on:click={() => {
            currentCourse.set({ ...courseModel })
            changeCourseModal.open('新建', 'success')
          }}
        >
          <Icon name="calendar2-plus" class="me-2" />
          新建课程
        </Button>
      {/if}

      <Button color="primary" on:click={() => fetchCourses()}>
        <Icon name="arrow-clockwise" class="me-2" />
        刷新
      </Button>
    </Grid>

    <Modal isOpen={$removeCourseModal.isOpen} toggle={removeCourseModal.toggle}>
      <div slot="header">删除课程</div>
      <div slot="body">
        将会删除 <strong>{$currentCourse.name}</strong> 的所有信息，此操作
        <strong>不可撤销</strong>，请谨慎操作
      </div>
      <div slot="footer">
        <Button color="danger" on:click={removeCourse}>删除</Button>
      </div>
    </Modal>

    <Modal isOpen={$changeCourseModal.isOpen} toggle={changeCourseModal.toggle} size="md">
      <div slot="header">{$changeCourseModal.type}课程信息</div>
      <div slot="body">
        <Form class="px-3 pt-3" on:submit={changeCourse} id="change-course">
          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">课程 ID</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="number"
                  required
                  disabled={$changeCourseModal.type === '修改'}
                  bind:value={$currentCourse.id}
                  placeholder="课程 ID"
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">课程名称</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  required
                  bind:value={$currentCourse.name}
                  placeholder={$currentCourse.name || '课程名称'}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">教师 ID</Label>
              </Col>
              <Col xs="8">
                <Input type="number" bind:value={$currentCourse.teacher.id} placeholder="教师 ID" />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">上课时间</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  bind:value={$currentCourse.time}
                  placeholder={$currentCourse.time || '上课时间'}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">上课地点</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  bind:value={$currentCourse.room}
                  placeholder={$currentCourse.room || '上课地点'}
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">课程周数</Label>
              </Col>
              <Col xs="8">
                <Input type="number" bind:value={$currentCourse.week} placeholder="课程周数" />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">课程类型</Label>
              </Col>
              <Col xs="8">
                <Input
                  type="text"
                  bind:value={$currentCourse.type}
                  placeholder={$currentCourse.type || '课程类型'}
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
                <Input type="select" name="college-select" bind:value={$currentCourse.college.id}>
                  <option value="0" selected={$currentCourse.college.id === ''}>
                    未选择院系
                  </option>
                  {#each $collegeList as college}
                    <option value={college.id} selected={college.id === $currentCourse.college.id}>
                      {college.name}
                    </option>
                  {/each}
                </Input>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row class="d-flex align-items-center">
              <Col xs="4">
                <Label class="m-0">学分</Label>
              </Col>
              <Col xs="8">
                <Input type="number" bind:value={$currentCourse.score} placeholder="学分" />
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
      <div slot="footer">
        <Button color={$changeCourseModal.color || 'primary'} type="submit" form="change-course">
          {$changeCourseModal.type}
        </Button>
      </div>
    </Modal>

    <Modal isOpen={$studentListCourseModal.isOpen} toggle={studentListCourseModal.toggle} size="lg">
      <div slot="header">课程「{$currentCourse.name}」的选课名单</div>
      <div slot="body">
        {#if courseStudentList && courseStudentList.length !== 0}
          <Table bordered>
            <thead>
              <tr>
                {#each studentListColumns as col}
                  <th class="px-3">{col.name}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each courseStudentList as row}
                <tr>
                  {#each row as course, index}
                    {#if index === row.length - 1}
                      <td class="w-50 align-middle p-2.5">
                        {#if course === 'true'}
                          <Button color="primary" disabled>已打分</Button>
                        {:else}
                          <div class="d-flex align-items-center">
                            <Input
                              class="w-50 me-2.5"
                              bind:value={markInput[row[0]]}
                              type="number"
                              placeholder="打分"
                            />
                            <Button
                              color="primary"
                              on:click={() => markStudent(row[0])}
                              disabled={!markInput}
                            >
                              确定
                            </Button>
                          </div>
                        {/if}
                      </td>
                    {:else}
                      <td class="align-middle px-3">{course}</td>
                    {/if}
                  {/each}
                </tr>
              {/each}
            </tbody>
          </Table>
        {/if}
      </div>
      <div slot="footer" />
    </Modal>
  {/if}
</Container>
