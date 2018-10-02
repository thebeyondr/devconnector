const Validator = require('validator')
const isEmpty = require('../is-empty')

module.exports = function validatePostInput (data) {
  const errors = {}
  data.text = !isEmpty(data.text) ? data.text : ''

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Type something...'
  } else if (!Validator.isLength(data.text, {min: 10, max: 300})) {
    errors.text = 'Post must be 10-300 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
