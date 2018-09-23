const express = require('express')
const router = express.Router()

// @route   GET /api/users/test
// @desc    Test route for users
// @access  Public
router.get('/test', (req, res) =>
  res.status(200).json({msg: 'User route working!'})
)

module.exports = router
