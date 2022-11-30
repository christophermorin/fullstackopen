const dummy = (blogs) => {
  return blogs.length
}
  
const totalLikes = (blogs) => {
  if(blogs.length === 0){
	  return 0
  }
  const blogLikes = blogs.map(blog => blog.likes)

  return blogs.length === 1 
    ? blogs[0].likes 
    : blogLikes.reduce((a,b) => a + b,0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return 'No blogs'
  }
	
  const blogLikes = blogs.map(blog => blog.likes)
  const mostLikes = Math.max(...blogLikes)
  const favBlog = blogs.filter(blog => blog.likes === mostLikes)

  return favBlog[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}