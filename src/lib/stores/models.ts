export const userModel: UserInfo = {
  name: null,
  id: null,
  role: null
}

export const studentModel: Student = {
  userId: null,
  userName: null,
  sex: null,
  birthYear: null,
  grade: null,
  collegeId: null
}

export const toastModel: Toast = {
  title: '',
  body: '',
  color: 'primary',
  isOpen: false
}

export const modalModel: Modal = {
  title: '',
  body: '',
  size: '',
  action: () => console.log('Modal'),
  actionText: '确定',
  actionType: 'primary',
  hasInput: false,
  inputType: 'text',
  inputPlaceholder: '',
  isOpen: false
}
