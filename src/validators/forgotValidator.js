const { default: validator } = require('validator');
const Validator = require('validator')
import isEmpty from "is-empty"

export const forgotValidator = (data)=> {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email: ''

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Username is required'
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}