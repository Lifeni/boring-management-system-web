import { readable } from 'svelte/store'

export const gridOptions = readable({
  pagination: {
    enabled: true,
    limit: 5,
    resetPageOnUpdate: false
  },
  search: true,
  sort: true,
  resizable: true,
  width: '100%',
  autoWidth: true,
  language: {
    search: { placeholder: '在此搜索 ...' },
    sort: { sortAsc: '升序排序', sortDesc: '降序排序' },
    pagination: {
      previous: '上一页',
      next: '下一页',
      showing: '展示',
      results: () => '条记录',
      of: '条记录，一共',
      to: '至'
    },
    loading: '加载中 ...',
    noRecordsFound: '没有匹配到记录',
    error: '获取数据时出现错误'
  }
})
