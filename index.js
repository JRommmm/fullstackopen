const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
/*
const express = require('express')


const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })





app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


*/


const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

/*
const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/