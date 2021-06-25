export const userModel: UserInfo = {
  name: null,
  id: null,
  role: null
}

export const toastModel: Toast = {
  title: '',
  body: '',
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
