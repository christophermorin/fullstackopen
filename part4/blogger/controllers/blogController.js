const blogRouter = require('express').Router()
const Users = require('../models/Users')
const Blog = require('../models/Blog')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  try {
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const token = request.token
  if(token === null){
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {

    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = await Users.findById(decodedToken.id)
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
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      return response.status(201).json(savedBlog)
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