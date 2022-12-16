import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import errorReducer from '../reducers/errorReducer'
import blogReducer from '../reducers/blogReducer'
import usersReducer from '../reducers/userReducer'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    error: errorReducer,
    blogs: blogReducer,
    users:  usersReducer,

  }
})



export default store