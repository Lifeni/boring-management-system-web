const role = {
  0: '管理员',
  1: '教师',
  2: '学生'
}

const roleMap = (num: number): string => role[num]

const feature = {
  0: [
    { name: '主页', url: '/' },
    { name: '课程', url: '/课程管理' },
    { name: '教师', url: '/教师管理' },
    { name: '学生', url: '/学生管理' },
    { name: '用户', url: '/用户管理' }
  ],
  1: [
    { name: '主页', url: '/' },
    { name: '课程', url: '/课程管理' }
  ],
  2: [
    { name: '主页', url: '/' },
    { name: '课程', url: '/课程管理' }
  ]
}

const featureMap = (num: number): Array<FeatureItem> => feature[num]

export { roleMap, featureMap }
