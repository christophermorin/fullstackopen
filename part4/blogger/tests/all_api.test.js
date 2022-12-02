const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./tests_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blogs = require('../models/Blog')
const Users = require('../models/Users')


beforeEach(async () => {
  await Blogs.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blogs(blog)
    await blogObject.save()
  }
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

describe('when new blogs are added', () => {
  test('confirming POST works', async () => {
    const allUsers = await helper.usersInDb()

    const newBlog = {
      title: "New blog post",
      author: "Bob Smith",
      url: "http://random.com",
      likes: 1,
      userId: allUsers[0].id
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
    const allUsers = await helper.usersInDb()

    const newBlog = {
      title: "Checking likes default to zero",
      author: "Bob Smith",
      url: "http://random.com",
      userId: allUsers[0].id
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
    const blogsAtStart = await helper.blogsInDb()

    const newLikes = 1000
    await api.put('/api/blogs/5a422a851b54a676234d17f7')
    .send({likes: newLikes})
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs[0].likes).toEqual(1000)
  })
}),

// User Tests

describe('when at least one User exsists', () => {
  beforeEach(async () => {
    await Users.deleteMany()

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('secret', saltRounds)

    const user = new Users({
      username: 'root',
      name: 'groot',
      passwordHash
    })
    await user.save()
  })

  test('get all users', async () => {
    const allUsers = await helper.usersInDb()
    expect(allUsers).toHaveLength(1) 
  })

  test('username must be unique', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'root',
      namme: 'isGroot',
      password: "123456"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username must be unique')
    const usersAtEnd = await helper.usersInDb()
    
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('creating new users', () => {
  test('username is required', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: '',
      namme: 'isGroot',
      password: "123456"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password required')
    const usersAtEnd = await helper.usersInDb()
    
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('password is required', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'otherroot',
      namme: 'isGroot',
      password: ""
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password required')
    const usersAtEnd = await helper.usersInDb()
    
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('username is >= 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'ro',
      namme: 'isGroot',
      password: "123456"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password must be longer than three characters')
    const usersAtEnd = await helper.usersInDb()
    
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('password is >= 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'roomba',
      namme: 'isGroot',
      password: "12"
    }

    const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password must be longer than three characters')
    const usersAtEnd = await helper.usersInDb()
    
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})



afterAll(() => {
  mongoose.connection.close()
})
