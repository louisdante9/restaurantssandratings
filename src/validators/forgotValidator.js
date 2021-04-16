const { default: validator } = require('validator');
const Validator = require('validator')
import isEmpty from "is-empty"

export const forgotValidator = (data)=> {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email: ''
   
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if(!Validator.isLowercase(data.email)) {
        errors.email = 'Email must be in lowercase';
    }
   
   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}



export const changeValidator = (data)=> {
    let errors = {}
    data.userName = !isEmpty(data.userName) ? data.userName: ''
    data.email = !isEmpty(data.email) ? data.email: ''
   
if(Validator.isEmpty(data.userName)) {
         errors.userName = 'Username is required'
     }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if(!Validator.isLowercase(data.email)) {
        errors.email = 'Email must be in lowercase';
    }
   
   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}