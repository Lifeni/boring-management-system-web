export const roleModel: RoleInfo = {
  name: '',
  id: ''
}

export const userModel: UserInfo = {
  name: '',
  id: '',
  role: roleModel
}

export const courseModel: CourseInfo = {
  id: '',
  name: '',
  teacher: '',
  time: '',
  room: '',
  week: '',
  type: '',
  college: '',
  score: ''
}

export const collegeModel: CollegeInfo = {
  name: '',
  id: ''
}

export const studentModel: StudentInfo = {
  id: '',
  name: '',
  sex: '',
  birth: '',
  grade: '',
  college: collegeModel
}

export const teacherModel: TeacherInfo = {
  id: '',
  name: '',
  sex: '',
  birth: '',
  degree: '',
  title: '',
  grade: '',
  college: collegeModel
}

export const toastModel: Toast = {
  title: '',
  body: '',
  color: 'primary',
  type: '',
  isOpen: false
}

export const modalModel: Modal = {
  isOpen: false,
  type: '',
  color: 'primary'
}
