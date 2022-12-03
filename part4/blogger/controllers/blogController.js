const blogRouter = require('express').Router()
const Users = require('../models/Users')
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')

require('dotenv').config()

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  try {
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const token = request.token
  if(token === null){
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = request.user
  const blog = new Blog(request.body)

  if(!blog.title || !blog.url){
    response.status(400).json({error: 'Blog title and url required'}).end()
  }
  else{
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0,
      user: user._id
    })  
    try {
      const savedBlog = await newBlog.save()
      user.blogs = await user.blogs.concat(savedBlog._id)
      await user.save()
      return response.status(201).json(savedBlog)
    } catch (error) {
      next(error)
    }
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const token = request.token
  if(token === null){
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'Blog does not exist'} )
  }

  const blogCreator = blog.user.toString()
  
  if (blogCreator === decodedToken.id) {
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    user.save()
    response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'User validation error'} )
  }

})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = request.body

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