const isEmpty = require('../../is-empty')
const Validator = require('validator')

module.exports = function validateLoginInput (data) {
  const errors = {}
  let {email, password} = data

  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''

  if (Validator.isEmpty(email)) {
    errors.email = 'Please enter an email'
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Check your email'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Please enter your password'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
