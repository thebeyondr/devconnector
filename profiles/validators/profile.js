const isEmpty = require('../../is-empty')
const Validator = require('validator')

module.exports = function validateProfileInput (data) {
  const errors = {}
  let {handle, status, skills} = data
  handle = !isEmpty(handle) ? handle : ''
  status = !isEmpty(status) ? status : ''
  skills = !isEmpty(skills) ? skills : ''

  if (Validator.isEmpty(handle)) {
    errors.handle = 'Please enter a handle'
  } else if (!Validator.isLength(handle, {min: 2, max: 30})) {
    errors.handle = 'Handles must have 2-30 characters'
  }

  if (Validator.isEmpty(status)) {
    errors.status = 'Status is required'
  }

  if (Validator.isEmpty(skills)) {
    errors.skills = 'Skills are required'
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL'
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL'
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL'
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL'
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL'
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
