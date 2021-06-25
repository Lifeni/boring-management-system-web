import { goto } from '$app/navigation'
import { toast } from '../stores/writable'

const handleResponse = async (res: Response) => {
  if (res.ok) {
    if (res.status === 200) return await res.json()
  } else {
    switch (res.status) {
      case 401: {
        goto('/登录')
        toast.open({
          title: '发生了什么？',
          body: '不用担心，只是登录失效了，再来一次就好了',
          isOpen: true
        })
        break
      }

      case 403: {
        goto('/登录?走错了吗=是的')
        toast.open({
          title: '发生了什么？',
          body: '知道吗，那不是你应该来的地方',
          isOpen: true
        })
        break
      }
    }
  }
}

export const get = async <T>(url: string): Promise<T> => fetch(url).then(handleResponse)

export const post = async <T, K>(url: string, body: T): Promise<K> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  }).then(handleResponse)
