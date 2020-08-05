const mongoose = require('mongoose')
const supertest = require('supertest')
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
  expect(response.body).toHaveLength(0)
})

/*
test('id is defined', () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});
*/


afterAll(() => {
  mongoose.connection.close()
})