const fetchers = async (...urls: string[]): Promise<unknown[]> => {
  const fetchData = (url: string) => fetch(url).then((r) => r.json())
  return Promise.all(urls.map(fetchData))
}

export default fetchers
