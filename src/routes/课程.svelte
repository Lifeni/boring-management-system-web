<script lang="ts">
  import Container from '$lib/components/Container.svelte'
  import Grid from '$lib/components/Grid.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { courseModel } from '$lib/stores/models'
  import { collegeList, createModal, headerText, toast, userInfo } from '$lib/stores/writable'
  import { del, get, post, put } from '$lib/utils/fetch'
  import { action, actionWrapper } from '$lib/utils/grid-actions'
  import type { TCell } from 'gridjs/dist/src/types'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { Button, Col, Form, FormGroup, Icon, Input, Label, Row } from 'sveltestrap'

  let courses: Array<Array<string | number | Date>> = null

  const removeCourseModal = createModal()
  const changeCourseModal = createModal()

  const currentCourse = writable<CourseInfo>({ ...courseModel })

  const columns = [
    { name: 'ID' },
    { name: '课程名称' },
    { name: '教师' },
    { name: '时间' },
    { name: '地点' },
    { name: '周数' },
    { name: '类型' },
    { name: '学分' },
    { name: '院系 ID', hidden: true },
    { name: '院系' },
    {
      name: '操作',
      sort: { enabled: false },
      formatter: (_: TCell, row: Row) => {
        switch (Number($userInfo.role.id)) {
          case 0: {
            return actionWrapper(
              action({
                text: '修改课程信息',
                icon: 'person',
                action: () => {
                  setCurrentCourse(row)
                  changeCourseModal.open('修改', 'primary')
                },
                color: 'primary'
              }),
              action({
                text: '删除',
                icon: 'person-x',
                action: () => {
                  setCurrentCourse(row)
                  removeCourseModal.open()
                },
                color: 'danger'
              })
            )
          }

          case 1: {
            return actionWrapper(
              action({
                text: '查看选课学生',
                icon: 'people',
                action: () => {
                  // setCurrentCourse(row)
                  // changeCourseModal.open('修改', 'primary')
                },
                color: 'success'
              })
            )
          }

          case 2: {
            return actionWrapper(
              action({
                text: '选课',
                icon: 'bookmark-plus',
                action: () => {
                  // setCurrentCourse(row)
                  // changeCourseModal.open('修改', 'primary')
                },
                color: 'success'
              })
            )
          }
        }
      }
    }
  ]

  const setCurrentCourse = (row: Row) => {
    const id = row.cells[0].data as string
    const name = row.cells[1].data as string
    const teacher = row.cells[2].data as string
    const time = row.cells[3].data as string
    const room = row.cells[4].data as string
    const week = row.cells[5].data as string
    const type = row.cells[6].data as string
    const score = row.cells[7].data as string
    const college = row.cells[8].data as string

    currentCourse.set({ id, name, teacher, time, room, week, type, college, score })
  }

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
          teacherId: Number($currentCourse.teacher),
          courseTime: $currentCourse.time,
          classRoom: $currentCourse.room,
          courseWeek: Number($currentCourse.week),
          courseType: $currentCourse.type,
          collegeId: Number($currentCourse.college),
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
          teacherId: Number($currentCourse.teacher),
          courseTime: $currentCourse.time,
          classRoom: $currentCourse.room,
          courseWeek: Number($currentCourse.week),
          courseType: $currentCourse.type,
          collegeId: Number($currentCourse.college),
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

  const fetchCourses = () => {
    get<IDataMessage<Array<ICourseResponse>>>('/api/courses/').then((res) => {
      courses = res?.data.map((course) => [
        course.courseId,
        course.courseName,
        course.teacherId,
        course.courseTime,
        course.classRoom,
        course.courseWeek,
        course.courseType,
        course.score,
        course.collegeId.toString(),
        $collegeList.find((c) => Number(c.id) === course.collegeId)?.name || '未知院系'
      ])
    })
  }

  const fetchColleges = () => {
    get<IDataMessage<Array<ICollegeResponse>>>('/api/colleges/').then((res) => {
      collegeList.create(res.data)
    })
  }

  onMount(() => {
    fetchCourses()
    fetchColleges()
  })
  headerText.set('课程信息管理')
</script>

<svelte:head>
  <title>课程信息管理</title>
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
          <Icon name="person-plus" class="me-2" />
          新建课程信息
        </Button>
      {/if}

      <Button color="primary" on:click={() => fetchCourses()}>
        <Icon name="arrow-clockwise" class="me-2" />
        刷新数据
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
                <Input type="number" bind:value={$currentCourse.teacher} placeholder="教师 ID" />
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
                <Input type="select" name="college-select" bind:value={$currentCourse.college}>
                  <option value="0" selected={$currentCourse.college === ''}> 未选择院系 </option>
                  {#each $collegeList as college}
                    {console.log(typeof college.id, typeof $currentCourse.college)}
                    <option value={college.id} selected={college.id === $currentCourse.college}>
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
  {/if}
</Container>
