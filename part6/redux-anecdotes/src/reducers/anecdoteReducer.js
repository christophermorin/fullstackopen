import { createSlice } from "@reduxjs/toolkit"
import doteServices from "../services/doteServices"

const doteSlice = createSlice({
  name: 'dotes',
  initialState: [],
  reducers: {
    setDotes(state,action){
      return action.payload.sort((a,b) => b.votes - a.votes)
    },
    createDote(state, action) {
      return [
        ...state,
        action.payload
      ]
    },
    upVote(state, action){
      const id = action.payload.id
      const doteToUpVote = state.find(dote => dote.id === id)
      const newState = state.map(dote => dote !== doteToUpVote ? dote : action.payload)
      return newState.sort((a,b) => b.votes - a.votes)
    }
  }
})

export const {createDote, upVote, setDotes} = doteSlice.actions

export const initializeDotes = () => {
  return async (dispatch) => {
    const response = await doteServices.getDotes()
    dispatch(setDotes(response))
  }
}

export const addNewDote = (content) => {
  return async (dispatch) => {
    const response = await doteServices.createDote(content)
    dispatch(createDote(response.data))
  }
}

export const upVoteOne = (id, update) => {
  return async (dispatch) => {
    const response = await doteServices.updateDote(id, update)
    dispatch(upVote(response))
  }
}

export default doteSlice.reducer
