const express = require('express')
const router = express.Router()

// @route   GET /api/posts/test
// @desc    Test route for posts
// @access  Public
router.get('/test', (req, res) =>
  res.status(200).json({msg: 'Posts route working!'})
)

module.exports = router
