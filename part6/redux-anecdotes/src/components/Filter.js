// import { useDispatch } from "react-redux"
import { filterDotes } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    const search = event.target.value
    props.filterDotes(search)
  }
  return (
    <div style={{marginBottom: '10px'}}>
        <input onChange={(handleChange)}/>     
    </div>
  )
}

const mapDispatchToProps = {
  filterDotes,
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
// export default Filter