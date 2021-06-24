const handleResponse = async (res: Response) => {
  if (res.ok) {
    if (res.status === 200) return await res.json()
  } else {
    throw new Error(res.statusText)
  }
}

export const get = async <T>(url: string): Promise<T> => fetch(url).then(handleResponse)

export const post = async <T, K>(url: string, body: T): Promise<K> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  }).then(handleResponse)
