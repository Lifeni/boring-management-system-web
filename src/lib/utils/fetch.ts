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
          color: 'warning',
          isOpen: true
        })
        break
      }

      case 403: {
        goto('/登录?走错了吗=是的')
        toast.open({
          title: '发生了什么？',
          body: '知道吗，那不是你应该来的地方',
          color: 'warning',
          isOpen: true
        })
        break
      }

      default: {
        switch (res.status / 100 - (res.status % 100)) {
          case 4: {
            toast.open({
              title: `Error ${res.status}`,
              body: `网页出错了（${res.statusText}），检查一下吧`,
              color: 'danger',
              isOpen: true
            })
            break
          }
          case 5: {
            toast.open({
              title: `Error ${res.status}`,
              body: `服务器出错了（${res.statusText}），检查一下吧`,
              color: 'danger',
              isOpen: true
            })
            break
          }
        }
      }
    }
  }
}

const handleError = (err: Error) => {
  console.debug(err)
}

export const get = async <T>(url: string): Promise<T> =>
  fetch(url).then(handleResponse).catch(handleError)

export const post = async <T, K>(url: string, body: T): Promise<K> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  })
    .then(handleResponse)
    .catch(handleError)

export const del = async <T>(url: string): Promise<T> =>
  fetch(url, { method: 'DELETE' }).then(handleResponse).catch(handleError)
