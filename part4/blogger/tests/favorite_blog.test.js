const listhelper = require('../utils/list_helper')

describe('favorite blog', () => {

  const listOfBlogs = [
    {
      title: 'Ayy',
      likes: 10
    },
    {
      title: 'Ohhh',
      likes: 5
    },
    {
      title: 'Winner',
      likes: 20
    }
  ]

  test('if no blogs enterd', () => {
    expect(listhelper.favoriteBlog([])).toBe('No blogs')
  })

  test('Blog with most likes', () => {
    expect(listhelper.favoriteBlog(listOfBlogs)).toEqual({
      title: 'Winner',
      likes: 20
    })
  })
})