import axios from 'axios'
const baseUrl = '/api/login'

const getLogin = async (userLogin) => {
  const user = await axios.post(baseUrl, userLogin)
  try {
    return user.data
  } catch (error) {
    console.log(error)
  }
}

export default { getLogin }
