import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
const NavBar = ({ logOut }) => {
  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }
  return (
    <>
      <AppBar>
        <Toolbar style={styles}>
          <Button color="inherit" component={Link} to="/" size='large'>
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users" size='large'>
            Users
          </Button>
          <Button color="inherit" component={Link} onClick={logOut} size='large'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NavBar