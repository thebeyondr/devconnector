const isEmpty = require('../../is-empty')
const Validator = require('validator')

module.exports = function validateRegisterInput (data) {
  const errors = {}
  let {name, email, password, password2} = data
  name = !isEmpty(name) ? name : ''
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  password2 = !isEmpty(password2) ? password2 : ''

  if (Validator.isEmpty(name)) {
    errors.name = 'Please enter a name'
  } else if (!Validator.isLength(name, {min: 2, max: 30})) {
    errors.name = 'Names must have 2-30 characters'
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Please enter an email'
  } else if (!Validator.isEmail(email)) {
    errors.email = 'That email seems invalid'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Please enter a password'
  } else if (!Validator.isLength(password, {min: 6, max: 30})) {
    errors.password = 'Passwords must have 6-30 characters'
    if (!Validator.equals(password, password2)) {
      errors.password2 = "Passwords don't match"
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
