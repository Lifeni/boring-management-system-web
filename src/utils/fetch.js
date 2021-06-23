const post = async (url, body) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' }
  }).then(async (res) => {
    if (res.ok) {
      return await res.json()
    }
    throw new Error(res)
  })
}

export { post }
