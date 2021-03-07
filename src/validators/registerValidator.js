const { default: validator } = require('validator');

const Validator = require('validator')

import isEmpty from 'is-empty'

const registerValidator = (data)=> {
    let errors = {}
    data.firstName = !isEmpty(data.firstName) ? data.firstName: ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName: ''
    data.email = !isEmpty(data.email) ? data.email: ''
    data.userName = !isEmpty(data.userName) ? data.userName: ''
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber: ''
    data.password = !isEmpty(data.password) ? data.password: ''
    data.passConfirm = !isEmpty(data.passConfirm) ? data.passConfirm: ''

    if(Validator.isEmpty(data.firstName)){
        errors.firstName = "FirstName is required"
    }
    if(Validator.isEmpty(data.lastName)){
        errors.lastName = "LastName is required"
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "Email is required"
    }
    if(Validator.isEmpty(data.userName)){
        errors.userName = "UserName is required"
    }
    if(Validator.isEmpty(data.phoneNumber)){
        errors.phoneNumber = "Phone Number is required"
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required"
    }
    if(Validator.isEmpty(data.passConfirm)){
        errors.passConfirm = "Password is required"
    }

if(!Validator.isLength(data.firstName, {min:2, max:10})){
    errors.firstName = "FirstName must be between 2-10 letter"
}
if(!Validator.isLength(data.lastName, {min:2, max:10})){
    errors.lastName = "FirstName must be between 2-10 letter"
}
if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
}
if (!Validator.isLength(data.userName, {min:5, max:30})){
    errors.userName = "UserName must be at least 5 character"
}
if(!Validator.isMobilePhone(data.phoneNumber)){
    errors.phoneNumber = "Phone Number is invalid"
}
if(!Validator.isStrongPassword(data.password)){
    errors.password = "Password must be at least 8 character  containing at least 1 lowercase, uppercase, symbols  "
}

if(!Validator.isStrongPassword(data.passConfirm)) {
    errors.passConfirm = 'Password must be at least 8 character  containing at least 1 lowercase, uppercase, symbols';
}

if(!Validator.equals(data.password, data.passConfirm)) {
    errors.passConfirm = 'Password and Confirm Password must match';
}


return {
    errors,
    isValid:isEmpty(errors)
}
}
module.exports = registerValidator 