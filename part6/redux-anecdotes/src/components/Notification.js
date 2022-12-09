// import { useSelector } from "react-redux"
import { connect } from "react-redux"
const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  console.log(props.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    props.notification.length > 0
    ?
      <div style={style}>
        {props.notification[props.notification.length -1]}
      </div>
    :
      <div>
      
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications
// export default Notification