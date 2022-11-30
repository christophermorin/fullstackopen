const listhelper = require('../utils/list_helper')

describe('total likes', () => {

  test('blog list is empty', () => {
    expect(listhelper.totalLikes([])).toBe(0)
  })


  test('blog has only one entry', () => {
    expect(listhelper.totalLikes(
      [{
        likes: 10
      }]
    )).toBe(10)
  })

  test('blog with multiple enties', () => {
    expect(listhelper.totalLikes([
      {
        likes: 10
      },
      {
        likes: 20
      }
    ])).toBe(30)
  })
})