import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getDotes = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const createDote = async (dote) => {
  const result = await axios.post(baseUrl, dote)
  return result
}

const updateDote = async (id, update) => {
  const result = await axios.put(`${baseUrl}/${id}`, update)
  return result.data
}

export default { getDotes, createDote, updateDote }