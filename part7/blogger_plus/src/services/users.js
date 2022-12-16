import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const allUsers = await axios.get(baseUrl)
  return allUsers.data
}

const getOneUser = async (id) => {
  const user = await axios.get(`${baseUrl}/${id}`)
  return user.data
}



export default { getAllUsers, getOneUser }