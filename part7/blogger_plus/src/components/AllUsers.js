import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/userReducer'
import userServices from '../services/users'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper
} from '@mui/material'

const AllUsers = () => {
  const allUsers = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const allUsers = async () => {
      const results = await userServices.getAllUsers()
      dispatch(getAllUsers(results))
    }
    allUsers()
  }, [])

  // const headers = {
  //   display: 'flex',
  //   gap: '30px'
  // }

  // const displayAllUsers = allUsers.map(user => {
  //   return (
  //     <div key={user.id}>
  //       <div style={ headers }>
  //         <Link to={`/users/${user.id}`}>
  //           <h3>{user.name}</h3>
  //         </Link>
  //         <h3>{user.blogs.length}</h3>
  //       </div>
  //     </div>
  //   )
  // })

  return (
    <>
      <h2>Viewing <span style={{ color: 'green' }}>all Users</span></h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Total Blog Posts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align='right'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // <div>
    //   <div style={ headers }>
    //     <h2>Name</h2>
    //     <h2>Blog Posts</h2>
    //   </div>
    //   {displayAllUsers}
    // </div>
  )
}

export default AllUsers