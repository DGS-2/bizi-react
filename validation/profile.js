const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data){
  let errors = {};

  // Figure out required fields
  data.name = !isEmpty(data.personalInfo.name.full) ? data.personalInfo.name.full : '';
  data.name = !isEmpty(data.personalInfo.name.firstName) ? data.personalInfo.name.firstName : '';
  data.name = !isEmpty(data.personalInfo.name.lastName) ? data.personalInfo.name.lastName : '';
  data.name = !isEmpty(data.personalInfo.rank.full) ? data.personalInfo.rank.full : '';
  data.name = !isEmpty(data.personalInfo.rank.abreviated) ? data.personalInfo.rank.abreviated : '';
  data.name = !isEmpty(data.contactInfo.email.unclass) ? data.contactInfo.email.unclass : '';
  data.name = !isEmpty(data.organization.wing) ? data.organization.wing : '';
  data.name = !isEmpty(data.organization.group) ? data.organization.group : '';
  data.name = !isEmpty(data.organization.squadron) ? data.organization.squadron : '';
  data.name = !isEmpty(data.organization.flight) ? data.organization.flight : '';

  return {
    errors,
    isValid: isEmpty(errors)
  }
}