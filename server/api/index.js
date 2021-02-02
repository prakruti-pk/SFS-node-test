const router = require('express').Router()

router.use('/creditors', require('./creditors'))
router.use('/credit_analysis', require('./creditAnalysis'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
