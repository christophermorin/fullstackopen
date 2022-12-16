import { createSlice } from '@reduxjs/toolkit'

const UsersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAllUsers(state, action){
      return action.payload
    }
  }
})

export const { setAllUsers } = UsersSlice.actions

export const getAllUsers = (users) => {
  return (dispatch) => {
    dispatch(setAllUsers(users))
  }
}



export default UsersSlice.reducer