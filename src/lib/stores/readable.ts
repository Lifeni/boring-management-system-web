import { readable } from 'svelte/store'

export const gridOptions = readable({
  pagination: { enabled: true, limit: 5 },
  search: true,
  sort: true,
  resizable: true,
  language: {
    search: {
      placeholder: '在此搜索 ...'
    },
    pagination: {
      previous: '上一页',
      next: '下一页',
      showing: '展示',
      results: () => '条记录',
      of: '条记录，一共',
      to: '至'
    }
  }
})
