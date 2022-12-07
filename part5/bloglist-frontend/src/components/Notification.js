const Notification = (props) => {
  const styles = props.error
    ?
    {
      border: '2px solid red',
      color: 'red',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '10px 0'
    }
    :
    {
      border: '2px solid green',
      color: 'green',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: '10px 0'
    }

  return (
    <div style={styles} className='notification'>
      {props.message}
    </div>
  )
}

export default Notification