const AddBlog = (props) => {

// const [title, setTitle] = useState('')
// const [author, setAuthor] = useState('')
// const [url, setUrl] = useState('')

 const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '20px 0',
  gap: '10px'
 }


  return(
    <div>
      <form style={container} onSubmit={props.addBlog}>
        Title:<input 
          name='Title' 
          placeholder='Title' 
          value={props.title} 
          onChange={({target}) => props.setTitle(target.value)}/>
        Author:<input 
          name='Author' 
          placeholder='Author' 
          value={props.author} 
          onChange={({target}) => props.setAuthor(target.value)}/>
        URL:<input 
          name='URL' 
          placeholder='URL' 
          value={props.url} 
          onChange={({target}) => props.setUrl(target.value)}/>
        <button>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog