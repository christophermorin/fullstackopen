const BlogExpanded = ({blog, incrementLike, deleteBlog}) => {

 

  return(
    <div>
      <ul>
        <li>{blog.author}</li>
        <li>{blog.url}</li>
        <li>{blog.likes}<button style={{marginLeft: '10px'}} onClick={incrementLike}>Like</button></li>
      </ul>
      <button onClick={deleteBlog}>Delete</button>
    </div>
  )
}

export default BlogExpanded