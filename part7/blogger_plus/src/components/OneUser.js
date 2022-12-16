import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const OneUser = () => {
  const id = useParams().id
  const allUsers = useSelector(state => state.users)
  console.log(id)
  const user = allUsers.find(user => user.id === id)
  if(!user){
    return null
  }
  const userBlogs = user.blogs.map(blog => {
    return (
      <div key={blog.id}>
        {blog.title}
        {blog.author}
        {blog.url}
        {blog.likes}
        <hr />
      </div>
    )
  })
  return (
    <div>
      {user.name}
      {userBlogs}
    </div>
  )
}

export default OneUser