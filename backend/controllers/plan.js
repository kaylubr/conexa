const planRouter = require('express').Router()
const Plan = require('../models/Plan')

planRouter.get('/', async (request, response, next) => {
  try {
    const plans = await Plan.find()
    response.json(plans)
  } catch (error) {
    next(error)
  }
})

planRouter.post('/', async (request, response, next) => {
  try {
    const payload = request.body

    const newPlan = new Plan({
      title: payload.title,
      url: payload.url ? payload.url : null,
      location: payload.location,
    })

    await newPlan.save()
    response.status(201).json({ message: `Successfully created ${payload.title}` })
  } catch (error) {
    next(error)
  }
})

module.exports = planRouter