import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)
  const error = useSelector(state => state.error)
  const styles = error
    ? {
      border: '2px solid red',
      color: 'red',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '10px 0',
    }
    : {
      border: '2px solid green',
      color: 'green',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '10px 0',
    }

  return (
    <div style={styles} className="notification">
      {notifications[notifications.length -1]}
    </div>
  )
}

export default Notification
