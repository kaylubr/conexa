const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  title: String,
  url: String,
  location: String,
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

planSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan