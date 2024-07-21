const fetchTopojson = async (url: string) => {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('Error in getGeoshape:', error)
    throw error
  }
}

export default fetchTopojson
