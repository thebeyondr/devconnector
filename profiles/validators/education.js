const isEmpty = require('../../is-empty')
const Validator = require('validator')

module.exports = function validateEducationInput (data) {
  const errors = {}
  let { school, degree, fieldofstudy, from } = data
  school = !isEmpty(school) ? school : ''
  degree = !isEmpty(degree) ? degree : ''
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : ''
  from = !isEmpty(from) ? from : ''

  if (Validator.isEmpty(school)) {
    errors.school = 'Job school is required'
  }

  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree is required'
  }

  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required'
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
