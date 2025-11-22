const unknownEndpoint = (request, response) => {
  response.status(404).json({ message: 'Unknown endpoint' })
}

const errorHandler = (err, request, response, next) => {
  console.log(err.message)
  console.log(err.name)

  next(err)
}

module.exports = { unknownEndpoint, errorHandler }