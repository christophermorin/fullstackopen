import { useDispatch, useSelector } from "react-redux"
import { filterDotes } from "../reducers/filterReducer"

const Filter = () => {
  const anecdotes = useSelector(state => state.dotes)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const search = event.target.value
    dispatch(filterDotes({search: search, dotes: anecdotes}))
  }

  return (
    <div style={{marginBottom: '10px'}}>
        <input onChange={(handleChange)}/>     
    </div>
  )
}

export default Filter