const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 0 blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log("test running in blog_api.test.js")
  expect(response.body).toHaveLength(4)
})

/*
test('id is defined', () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});
*/

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "first",
	author: "bob",
	url: "www.fart.com",
	likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
/*  
  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length + 1)
*/
  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    "first"
  )
})


afterAll(() => {
  mongoose.connection.close()
})