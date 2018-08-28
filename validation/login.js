const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //email validation
  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }
  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field is required';
  }

  //password validation
  if(!Validator.isLength(data.password, { min: 6, max: 30 })){
    errors.password = 'Password must be at least 6 characters';
  }
  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field is required';
  }

  return {
    errors, //各項目のvalidのerrorがあるかどうか確認
    isValid: isEmpty(errors) //emptyの真偽の確認
  };
};
