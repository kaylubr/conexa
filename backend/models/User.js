const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  plans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  }]
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret.passwordHash
    delete ret._id
    delete ret.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User