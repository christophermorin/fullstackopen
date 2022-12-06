import axios from 'axios'
const baseUrl = '/api/blogs'
const authUrl = '/api/auth'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = async (id) => {
  const user = await axios.get(`${authUrl}/${id}`)
  token = `Bearer ${user.data}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseUrl}`, newBlog, config)
  return response.data
}

const incrementLike = async (id, newBlog) => {
  try {
    await axios.put(`${baseUrl}/${id}`, newBlog)
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  return
}

export default { getAll, setToken, addBlog, incrementLike, deleteBlog, getToken }