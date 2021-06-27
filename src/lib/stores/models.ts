export const roleModel: RoleInfo = {
  name: '',
  id: ''
}

export const userModel: UserInfo = {
  name: '',
  id: '',
  role: roleModel
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

export const toastModel: Toast = {
  title: '',
  body: '',
  color: 'primary',
  isOpen: false
}
