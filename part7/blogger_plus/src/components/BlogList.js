import Blog from '../components/Blog'
import { Link } from 'react-router-dom'
const BlogList = (props) => {
  return (
    <ul id="allBlogs">
      {props.allBlogs
        .sort((a,b) => b.likes - a.likes)
        .map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <Blog
              key={blog.id}
              blog={blog}
            />
          </Link>
        ))}
    </ul>
  )
}

export default BlogList