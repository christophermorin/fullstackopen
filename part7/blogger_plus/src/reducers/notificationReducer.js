import { createSlice } from '@reduxjs/toolkit'

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    endMessage(state){
      state.shift()
    },
    setMessage(state, action){
      state.push(action.payload)
    }
  }
})

export const { endMessage, setMessage } = NotificationSlice.actions

export const setNotificationMessage = (message, time) => {
  return (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(endMessage())
    },time * 1000)
  }
}

export default NotificationSlice.reducer