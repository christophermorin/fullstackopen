const BlogExpanded = ({ blog, incrementLike, deleteBlog }) => {
  return (
    <div>
      <ul>
        <li>
          <span id="authorExpanded">{blog.author}</span>
        </li>
        <li>
          <span id="urlExpanded">{blog.url}</span>
        </li>
        <li>
          <span id="likesExpanded">{blog.likes}</span>
          <button style={{ marginLeft: '10px' }} onClick={incrementLike}>
            Like
          </button>
        </li>
      </ul>
      <button onClick={deleteBlog}>Delete</button>
    </div>
  )
}

export default BlogExpanded
