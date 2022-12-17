import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper
} from '@mui/material'
import { Link } from 'react-router-dom'

const OneUser = () => {
  const id = useParams().id
  const allUsers = useSelector(state => state.users)
  console.log(id)
  const user = allUsers.find(user => user.id === id)
  if(!user){
    return null
  }
  // const userBlogs = user.blogs.map(blog => {
  //   return (
  //     <div key={blog.id}>
  //       {blog.title}
  //       {blog.author}
  //       {blog.url}
  //       {blog.likes}
  //       <hr />
  //     </div>
  //   )
  // })
  return (
    <div>
      <h2>All blogs from <span style={{ color: 'green' }}>{user.name}</span></h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs
              .map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell align="right"><a href="#" rel='noreferrer' target={'_blank'}>{blog.url}</a></TableCell>
                  <TableCell align="right">{blog.likes}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default OneUser