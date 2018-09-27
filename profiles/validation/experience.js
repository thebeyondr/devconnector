const isEmpty = require('../../is-empty')
const Validator = require('validator')

module.exports = function validateExperienceInput (data) {
  const errors = {}
  let {title, company, from} = data
  title = !isEmpty(title) ? title : ''
  company = !isEmpty(company) ? company : ''
  from = !isEmpty(from) ? from : ''

  if (Validator.isEmpty(title)) {
    errors.title = 'Job title is required'
  }

  if (Validator.isEmpty(company)) {
    errors.company = 'Company is required'
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
