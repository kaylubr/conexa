require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const JWT_KEY = process.env.JWT_KEY

module.exports = { MONGODB_URI, JWT_KEY, PORT }