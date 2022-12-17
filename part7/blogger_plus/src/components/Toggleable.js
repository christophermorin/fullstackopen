import { useState } from 'react'
import { Button } from '@mui/material'
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
        <Button onClick={handleChangeVisibility} style={{ marginTop: '10px' }} variant="contained">
          {props.title}
        </Button>
      </div>
      <div style={showOnFormOpen}>
        {props.children}
        <Button onClick={handleChangeVisibility} variant="outlined" color="error">Cancel</Button>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Toggleable
