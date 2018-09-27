const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const passport = require('passport')

// Load validators
const validateRegisterInput = require('./validation/register')
const validateLoginInput = require('./validation/login')

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
  const {errors, isValid} = validateRegisterInput(req.body)
  // Check validation
  if (!isValid) {
    res.status(400).json(errors)
  }
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
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
              return res.status(201).json(user)
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
// @desc    Logs in user and returns JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const {email, password} = req.body
  const {errors, isValid} = validateLoginInput(req.body)
  // Check validation
  if (!isValid) {
    res.status(400).json(errors)
  }
  const loginError = "Something isn't right. Check your info?"
  User.findOne({email}).then(user => {
    if (!user) {
      errors.email = loginError
      return res.status(400).json(errors)
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT payload
        const payload = {id: user.id, name: user.name, avatar: user.avatar}
        // Sign token
        jwt.sign(payload, keys.secretKey, {expiresIn: 3600}, (err, token) => {
          if (!err) {
            return res.status(200).json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        })
        // return res.status(200).json({loginSuccess: 'Signed In!'})
      } else {
        errors.password = loginError
        return res.status(400).json(errors)
      }
    })
  })
})

// @route   POST /api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  }
)
module.exports = router
