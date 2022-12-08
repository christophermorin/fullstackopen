import { createSlice } from "@reduxjs/toolkit";
import doteServices from "../services/doteServices";

const filterSlice = createSlice({
  name: "filter",
  initialState: [],
  reducers: {
    filterDotes(state,action){
      const allDotes = action.payload.dotes
      if(action.payload.search){
        const filteredDotes = allDotes.filter(dote => dote.content.toLowerCase().includes(action.payload.search.toLowerCase()))
        return filteredDotes
      }else{
        return []
      }
    },
    filterUpVote(state,action){
      const id = action.payload.id
      const doteToUpVote = state.find(dote => dote.id === id)
      const newState = state.map(dote => dote !== doteToUpVote ? dote : action.payload)
      return newState.sort((a,b) => b.votes - a.votes)
    }
  }
})

export const {filterDotes, filterUpVote} = filterSlice.actions

export const filterUpVoteOne = (id, update) => {
  return async (dispatch) => {
    const response = await doteServices.updateDote(id, update)
    dispatch(filterUpVote(response))
  }
}

export default filterSlice.reducer