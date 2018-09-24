const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// Load user model
const User = require('./model')
// @route   GET /api/users/test
// @desc    Test route for users
// @access  Public
router.get('/test', (req, res) =>
  res.status(200).json({msg: 'User route working!'})
)

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      res.status(400).json({email: 'Email already exists'})
    } else {
      const {name, email, password} = req.body
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      })
      const newUser = new User({
        name,
        email,
        password,
        avatar
      })
      // Create password, update user and save to database
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw new Error()
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.log(err)
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              res.status(201).json(user)
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    }
  })
})

// @route   POST /api/users/login
// @desc    Login user and return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const {email, password} = req.body
  const loginError = "Something isn't right. Check your info?"
  User.findOne({email}).then(user => {
    if (!user) {
      return res.status(400).json({loginError})
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        return res.status(200).json({loginSuccess: 'Signed In!'})
      } else {
        return res.status(400).json({loginError})
      }
    })
  })
})
module.exports = router
