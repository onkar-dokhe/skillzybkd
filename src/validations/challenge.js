const Joi = require('joi');

const createChallengeValidation = ({ topic }) => {
    const joiSchema = Joi.object().keys({
        topic: Joi.string().required().messages({
            "string.base": `topic should be a type of String`,
            "string.empty": `topic cannot be an empty field`,
            "any.required": `topic is required.`,
        })
    })
    const { value, error } = joiSchema.validate({ topic }, { escapeHtml: true })
    return { value, error }
}

module.exports = { createChallengeValidation }


