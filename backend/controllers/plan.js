const planRouter = require('express').Router()
const Plan = require('../models/Plan')

planRouter.get('/', async (_, response, next) => {
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

planRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, url, location, completed } = request.body

    const newPlan = await Plan.findByIdAndUpdate(request.params.id, {
      title, 
      url, 
      location, 
      completed
    }, { new: true })
    await newPlan.save()

    response.json(newPlan)
  } catch (error) {
    next(error)
  }
})

planRouter.delete('/:id', async (request, response, next) => {
  try {
    await Plan.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = planRouter