const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)

const Blogs = require('../models/Blog')


beforeEach(async () => {
  await Blogs.deleteMany()
  let blogObjects = new Blogs(helper.initialBlogs[0])
  await blogObjects.save()
  blogObjects = new Blogs(helper.initialBlogs[1])
  await blogObjects.save()
  blogObjects = new Blogs(helper.initialBlogs[2])
  await blogObjects.save()
})



describe('When some blogs exsist', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('verify blogs have valid id strings', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
}),

describe('When new blogs are added', () => {
  test('confirming POST works', async () => {
    const newBlog = {
      title: "New blog post",
      author: "Bob Smith",
      url: "http://random.com",
      likes: 1,
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)

    expect(contents).toContain('New blog post')
  })

  test('confirm default value for likes', async () => {
    const newBlog = {
      title: "Checking likes default to zero",
      author: "Bob Smith",
      url: "http://random.com",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb() 
    const newestBlog = blogs[blogs.length - 1]

    expect(newestBlog.likes).toEqual(0)
  })

  test('title is missing', async () => {
    const newBlog = {
      author: "Bob Smith",
      url: "http://random.com",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('url is missing', async () => {
    const newBlog = {
      title: "Checking for missing url",
      author: "Bob Smith",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
}),

describe('Deleting blogs', () => {
  test('delete one blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0].id

    await api.delete(`/api/blogs/${blogToDelete}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const blogTitles = blogsAtEnd.map(blog => blog.title)
    
    expect(blogTitles).not.toContain(blogToDelete.title)
  })
}),
  
describe('Updating blogs', () => {
  test('update one blog', async () => {
    const newLikes = 1000
    await api.put('/api/blogs/5a422a851b54a676234d17f7')
    .send({likes: newLikes})
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs[0].likes).toEqual(1000)
  })
}),

afterAll(() => {
  mongoose.connection.close()
})
