const Joi = require('joi');


// const validateUser = (schema) =>(payload) =>
//     schema.validate(payload, {aboutEarly: false})

const userValidationSchema = Joi.object({
    name: Joi.string().required()
        .messages({
            'string.empty': 'Instructor name is required',
            'any.required': 'Instructor name is required'
        })
        .trim(), 

    email: Joi.string()
        .email()
        .lowercase()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required'

        }),
    confirmPassword:Joi.string()
    .valid(Joi.ref('password')) 
    .messages({
        'string.empty': 'Confirm password is required',
        'any.only': 'Passwords do not match', 
        'any.required': 'Confirm password is required'
    }),
    

    bio: Joi.string()
        .trim()
        .allow('') // Optional field, can be empty
        .messages({
            'string.base': 'Bio must be a string'
        }),

    profilePicture: Joi.string()
        .uri()
        .default('https://example.com/default-profile.png')
        .messages({
            'string.uri': 'Profile picture must be a valid URL'
        }),

    role: Joi.string()
        .valid('instructor', 'student')
        .required()
        .messages({
            'any.only': 'Role must be either "instructor or "student"',
            'any.required': 'Role is required'
        })
});

const loginValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email or password is incorrect',
            'any.required': 'Email or password is incorrect'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Email or password is incorrect'
        })
});


const validateUser = (data) => {
    return userValidationSchema.validate(data, { abortEarly: false });
};

const validateLogin = (data) => {
    return loginValidationSchema.validate(data, { abortEarly: false });
};

module.exports = { validateUser, validateLogin};