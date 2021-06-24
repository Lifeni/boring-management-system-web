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

export const modalsModel: Modals = {
  title: '',
  body: '',
  size: '',
  action: () => console.log('Modals'),
  actionText: '确定',
  actionType: 'primary',
  hasInput: false,
  inputType: 'text',
  inputPlaceholder: '',
  isOpen: false
}
