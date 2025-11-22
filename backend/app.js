const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware.js')
const planRouter = require('./controllers/plan')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const { MONGODB_URI } = require('./utils/config')

const app = express()

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connection successful`))
  .catch(error => console.error(error))

app.use(express.json())
app.use('/api/login', loginRouter)
app.use(middleware.extractToken)
app.use(middleware.extractUser)
app.use('/api/plans', planRouter)
app.use('/api/users', userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app