const express = require('express')
const router = express.Router()

// @route   GET /api/profiles/test
// @desc    Test route for profiles
// @access  Public
router.get('/test', (req, res) =>
  res.status(200).json({msg: 'Profiles route working!'})
)

module.exports = router
