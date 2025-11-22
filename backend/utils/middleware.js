const unknownEndpoint = (request, response) => {
  response.status(404).json({ message: 'Unknown endpoint' })
}

module.exports = { unknownEndpoint }