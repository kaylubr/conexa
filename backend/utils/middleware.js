const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('./config')
const User = require('../models/User')

const extractToken = (request, response, next) => {
  const token = request.get('authorization')
  if (token && token.startsWith('Bearer ')) {
    request.token = token.replace('Bearer ', '')
  }

  next()
}

const extractUser = async (request, response, next) => {
  const token = request.token
  const decoded = jwt.verify(token, JWT_KEY)
  request.user = await User.findById(decoded.id)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ message: 'Unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  console.log(err.message)

  if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key')) {
    response.status(400).json({ message: 'Username already exists' })
  } else if (err.name === 'JsonWebTokenError') {
    response.status(401).json({ message: 'Invalid token' })
  } else if (err.name === 'TokenExpiredError') {
    return response.status(401).json({ message: 'Token has expired' })
  }

  next(err)
}

module.exports = { unknownEndpoint, errorHandler, extractToken, extractUser }