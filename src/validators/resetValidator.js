const Validator = require('validator')
import isEmpty from "is-empty"

export const resetValidator = (data)=> {
    let errors = {}
 data.token = !isEmpty(data.token) ? data.token: ''
 data.password = !isEmpty(data.password) ? data.password: ''
 data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm: ''

 if(Validator.isEmpty(data.token)) {
     errors.token = 'Token is required'
 }
 if(Validator.isEmpty(data.password)) {
     errors.token = 'Password is required'
 }
 if(Validator.isEmpty(data.passwordConfirm)) {
     errors.passwordConfirm = 'Confirm password is required'
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
return  {
    errors,
    isValid:isEmpty(errors)
}


}