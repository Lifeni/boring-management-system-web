const post = async <T, K>(url: string, body: T): Promise<K> => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  }).then(async (res: Response) => {
    if (res.ok) {
      return await res.json()
    }
    throw new Error(res.statusText)
  })
}

export { post }
