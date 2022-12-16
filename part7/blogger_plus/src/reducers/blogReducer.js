import { createSlice } from '@reduxjs/toolkit'

const BlogSlice = createSlice({
  name : 'blogs',
  initialState: [],
  reducers: {
    setAllBlogs(state, action){
      const sortedBlogs = action.payload.sort((a,b) => b.likes - a.likes)
      return [...sortedBlogs]
    },
    addBlog(state, action){
      return [...state, action.payload]
    },
    likeBlog(state, action){
      const blogIndex = state.findIndex(blog => blog.id === action.payload.id)
      state = [...state, state[blogIndex] = action.payload.newBlog]
    },
    deleteBlog(state, action){
      return state.filter(blog => blog.id !== action.payload)
    },
  }
})

export const { setAllBlogs, addBlog, likeBlog, deleteBlog } = BlogSlice.actions

export const setBlogs = (blogs) => {
  return (dispatch) => {
    dispatch(setAllBlogs(blogs))
  }
}

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    await dispatch(addBlog(newBlog))
  }
}

export const likeOneBlog = (id, newBlog) => {
  return async (dispatch) => {
    await dispatch(likeBlog({ id, newBlog }))
  }
}

export const deleteOneBlog = (id) => {
  return (dispatch) => {
    dispatch(deleteBlog(id))
  }
}

export default BlogSlice.reducer