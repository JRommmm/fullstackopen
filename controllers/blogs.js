const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  
  //console.log('inside post')
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  //console.log("inside put")
  const body = request.body
  //console.log(body.likes)
  const newLikes = {
    likes: body.likes
  }

/* //this works!
  Blog.findByIdAndUpdate(request.params.id, newLikes, { new: true })
  .then(updatedBlog => {
    response.json(updatedBlog)
  })
  .catch(error => next(error))
*/

  
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newLikes, { new: true })

    if (updatedBlog){
   response.json(updatedBlog) 
  } else {
      response.status(404).end()
    }
}
  catch(exception){
    next(exception)
  }

})


module.exports = blogsRouter