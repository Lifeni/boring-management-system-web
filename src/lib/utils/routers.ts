const routers = {
  0: [
    { name: '主页', url: '/' },
    { name: '课程', url: '/课程管理' },
    { name: '教师', url: '/教师管理' },
    { name: '学生', url: '/学生管理' },
    { name: '用户', url: '/用户管理' }
  ],
  1: [
    { name: '主页', url: '/' },
    { name: '教的课程', url: '/课程管理' }
  ],
  2: [
    { name: '主页', url: '/' },
    { name: '所有课程', url: '/课程管理' },
    { name: '已选课程', url: '/课程管理/已选课程' },
    { name: '已修完课程', url: '/课程管理/已修完课程' }
  ],
  default: [{ name: '主页', url: '/' }]
}

export const getRouter = (num: number): Array<RouterItem> => routers[num] || routers['default']
