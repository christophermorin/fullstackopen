import { useState } from 'react'
import PropTypes from 'prop-types'
const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideOnFormOpen = { display: visible ? 'none' : '' }
  const showOnFormOpen = { display: visible ? '' : 'none' }

  const handleChangeVisibility = () => {
    setVisible((prevstate) => !prevstate)
  }

  return (
    <div>
      <div style={hideOnFormOpen}>
        <button onClick={handleChangeVisibility} style={{ marginTop: '10px' }}>
          {props.title}
        </button>
      </div>
      <div style={showOnFormOpen}>
        {props.children}
        <button onClick={handleChangeVisibility}>Cancel</button>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Toggleable
