import { createSlice } from "@reduxjs/toolkit";

// const initialState = []

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    endMessage(state,action){
      state.shift()
    },
    setMessage(state, action){
      state.push(action.payload)
    }
  }
})

export const {endMessage, setMessage} = NotificationSlice.actions

export const setNotificationMessage = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    const timer = setTimeout(() => {
      dispatch(endMessage())
    },time * 1000)
   
    
    
    
  } 
}

export default NotificationSlice.reducer