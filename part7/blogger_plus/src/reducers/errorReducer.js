import { createSlice } from '@reduxjs/toolkit'

const ErrorSlice = createSlice({
  name: 'error',
  initialState: false,
  reducers: {
    setError(state, action){
      return state = action.payload
    }
  }
})

export const { setError } = ErrorSlice.actions

export const setErrorStyle = (bool) => {
  return async (dispatch) => {
    dispatch(setError(bool))
  }
}

export default ErrorSlice.reducer