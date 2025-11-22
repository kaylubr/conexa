const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  title: String,
  url: String,
  location: String,
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamp: true })

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan