//const { default: validator } = require('validator');
const Validator = require('validator')
import isEmpty from 'is-empty'

export const loginValidator = (data)=>{
    let errors = {}
    data.userName = !isEmpty(data.userName) ? data.userName: ''
    data.password = !isEmpty(data.password) ? data.password:''

    if(Validator.isEmpty(data.userName)) {
        errors.userName = 'Username is required'
    }
   
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
