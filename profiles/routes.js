const express = require('express')
const router = express.Router()
const passport = require('passport')

// Models
const Profile = require('./model')
const User = require('../users/model')

// Validators
const validateProfileInputs = require('./validators/profile')
const validateExperienceInput = require('./validators/experience')
const validateEducationInput = require('./validators/education')

// @route   GET /api/profiles/
// @desc    Get all profiles
// @access  Public
router.get('/', (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'Could not find any profiles'
        return res.status(400).json(errors)
      }
      res.status(200).json(profiles)
    })
    .catch(err => res.status(400).json(err))
})

// @route   GET /api/profiles/current
// @desc    Get current user profile
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'Could not find profile'
          return res.status(400).json(errors)
        }
        res.status(200).json(profile)
      })
      .catch(err => res.status(400).json(err))
  }
)

// @route   GET /api/profiles/handle/:handle
// @desc    Get current user profile
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'Could not find profile'
        return res.status(400).json(errors)
      }
      res.status(200).json(profile)
    })
    .catch(err => res.status(400).json(err))
})

// @route   POST /api/profiles/
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInputs(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { skills, youtube, facebook, linkedin, instagram, twitter } = req.body
  const profileFields = {
    ...req.body,
    user: req.user.id,
    skills: skills.split(','),
    social: { youtube, twitter, facebook, linkedin, instagram }
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => {
        res.json(profile)
      })
    } else {
      // Check handle
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle has been taken'
          res.status(400).json(errors)
        } else {
          // Create
          new Profile(profileFields)
            .save()
            .then(profile => res.status(200).json(profile))
        }
      })
    }
  })
})

// @route   POST /api/profiles/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation
    const { errors, isValid } = validateExperienceInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // Add to profile
      profile.experience.unshift(newEdu)
      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route   POST /api/profiles/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation
    const { errors, isValid } = validateEducationInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // Add to profile
      profile.education.unshift(newExp)
      profile.save().then(profile => res.json(profile))
    })
  }
)

// @route   DELETE /api/profiles/experience/:expId
// @desc    Remove an experience from a profile
// @access  Private
router.delete(
  '/experience/:expId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Remove experience
        profile.experience.remove({ _id: req.params.expId })
        // Save profile
        profile.save().then(profile => res.status(200).json(profile))
      })
      .catch(err => {
        if (err) {
          res.status(404).json(err)
        }
      })
  }
)

// @route   DELETE /api/profiles/education/:eduId
// @desc    Remove an education from a profile
// @access  Private
router.delete(
  '/education/:eduId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Remove education
        profile.education.remove({ _id: req.params.eduId })
        // Save profile
        profile.save().then(profile => res.status(200).json(profile))
      })
      .catch(err => {
        if (err) {
          res.status(404).json(err)
        }
      })
  }
)

// @route   DELETE /api/profiles/
// @desc    Remove a profile and user
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id })
      .then(() => {
        User.findOneAndDelete({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        )
      })
      .catch(err => {
        if (err) {
          res.status(404).json(err)
        }
      })
  }
)
module.exports = router
