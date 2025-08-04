import Joi from 'joi';

export const createTeamSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    designation: Joi.string().min(1).required().messages({
        'string.base': 'Designation must be a string',
        'string.empty': 'Designation is required',
        'any.required': 'Designation is required'
    }),
    department: Joi.string().min(1).required().messages({
        'string.base': 'Department must be a string',
        'string.empty': 'Department is required',
        'any.required': 'Department is required'
    }),
    description: Joi.string().trim().optional().allow('').messages({
        'string.base': 'Description must be a string'
    }),
    socialLinks: Joi.object({
        facebook: Joi.string().trim().optional().allow(''),
        linkedin: Joi.string().trim().optional().allow(''),
    }).optional().messages({
        'object.base': 'Social links must be an object'
    }),
    isActive: Joi.boolean().optional().default(true),
    isSteering: Joi.boolean().optional().default(false)
}).options({ abortEarly: false });