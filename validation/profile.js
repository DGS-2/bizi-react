const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data){
  let errors = {};

  // Figure out required fields

  return {
    errors,
    isValid: isEmpty(errors)
  }
}