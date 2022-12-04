import {useState} from 'react'
const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

 
  const hideOnFormOpen = {display: visible ? 'none' : ''}
  const showOnFormOpen = {display: visible ? '' : 'none'}
  
  const handleChangeVisibility = () => {
    setVisible(prevstate => !prevstate)
  }

  return(
    <div>
      <div style={hideOnFormOpen}>
        <button onClick={handleChangeVisibility}>Creat New Entry</button>
      </div>
      <div style={showOnFormOpen}>
        {props.children}
        <button onClick={handleChangeVisibility}>Cancel</button>
      </div>
    </div>
  )
}

export default Toggleable