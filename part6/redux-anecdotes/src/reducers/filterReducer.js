import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: null,
  reducers: {
    filterDotes(state,action){
      const search = action.payload.toLowerCase()
      return search
    }
  }
})

export const {filterDotes} = filterSlice.actions

export default filterSlice.reducer