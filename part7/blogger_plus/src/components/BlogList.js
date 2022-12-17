// import Blog from '../components/Blog'
import { Link } from 'react-router-dom'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper
} from '@mui/material'

const BlogList = (props) => {
  return (
    <>
      <h2>Viewing <span style={{ color: 'green' }}>all Blogs</span></h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Author</TableCell>
              <TableCell align='right'>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allBlogs
              .sort((a,b) => b.likes - a.likes)
              .map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell align='right'>{blog.author}</TableCell>
                  <TableCell align='right'>{blog.likes}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogList

// <ul id="allBlogs">
//   {props.allBlogs
//     .sort((a,b) => b.likes - a.likes)
//     .map((blog) => (
//       <Link key={blog.id} to={`/blogs/${blog.id}`}>
//         <Blog
//           key={blog.id}
//           blog={blog}
//         />
//       </Link>
//     ))}
// </ul>