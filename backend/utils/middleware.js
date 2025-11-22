const unknownEndpoint = (request, response) => {
  response.status(404).json({ message: 'Unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  console.log(err.message)

  if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key')) {
    response.status(400).json({ message: 'Username already exists' })
  }

  next(err)
}

module.exports = { unknownEndpoint, errorHandler }