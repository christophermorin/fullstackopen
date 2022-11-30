const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const logger = require('../utils/logger')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  try {
    response.json(blogs)
  } catch (error) {
    logger.error(error)
  }      
})
    
blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if(!blog.title || !blog.url){
    response.status(400).end()
  }
  else{
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0
    })  
    try {
      const savedBlog = await newBlog.save()

      response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
}
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  try {
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = request.body
  console.log(blog)

  const updatedBlog = {
    likes: blog.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  try {
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter