import isEmail from 'validator/lib/isEmail.js'
import isStrongPassword from 'validator/lib/isStrongPassword.js'

export const validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {}
    if (username.trim() === "") {
        errors.username = "Username must not be empty."
    }
    if (email.trim() === "") {
        errors.email = "Email must not be empty."
    } else {
        if (!isEmail(email)) {
            errors.email = "Email must be a valid email address."
        }
    }

    if (password === "") {
        errors.password = "Password must not be empty."
    } else {
        if (!isStrongPassword(password)) {
            errors.password = "Password is weak."
        } else {
            if (password !== confirmPassword) {
                errors.confirmPassword = "Passwords must match."
            }
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === "") {
        errors.username = "Username must not be empty."
    }

    if (password.trim() === "") {
        errors.password = "Password must not be empty."
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}