import { useSelector } from 'react-redux'
import { Alert }  from '@mui/material'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)
  const error = useSelector(state => state.error)
  const styles =
    {
      fontSize: '1rem',
      fontWeight: 'bold',
      position: 'absolute',
      right: 100,
      top: 100
    }

  const severity = error ? 'error' : 'success'

  return (
    <Alert style={styles} severity={severity} className="notification">
      {notifications[notifications.length -1]}
    </Alert>
  )
}

export default Notification
