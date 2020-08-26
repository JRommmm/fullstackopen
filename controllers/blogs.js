const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)

/*
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    */
})

blogsRouter.post('/', async (request, response) => {
  
  //console.log('inside post')

  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  //Here is where "POST" both saves to the blog, and to user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.json(savedBlog)
//    VV---   OLD implementation  ---VV
  /*
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
  */
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