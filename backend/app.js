const express = require('express')
const mongoose = require('mongoose')
const planRouter = require('./controllers/plan')
const userRouter = require('./controllers/user')
const { MONGODB_URI } = require('./utils/config')

const app = express()

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connection successful`))
  .catch(error => console.error(error))

app.use(express.json())
app.use('/api/plans', planRouter)
app.use('/api/users', userRouter)

module.exports = app