const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

const app = express()

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connection successful`))
  .catch(error => console.error(error))

module.exports = app