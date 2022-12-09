import { useDispatch } from "react-redux"
import { filterDotes } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const search = event.target.value
    dispatch(filterDotes(search))
  }
  return (
    <div style={{marginBottom: '10px'}}>
        <input onChange={(handleChange)}/>     
    </div>
  )
}

export default Filter