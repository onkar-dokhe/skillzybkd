const Joi = require('joi');

const accountInfoValidation = ({ name, phone, city, college }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string()
            .messages({
                'string.base': `Name should be a type of String`,
            }),
        phone: Joi.string().messages({
            "string.base": `phone should be a type of String`,
        }),
        city: Joi.string().messages({
            "string.base": `city should be a type of String`,
        }),
        college: Joi.string().messages({
            "string.base": `college should be a type of String`,
        }),
    })
    phone = phone?.toString();
    const { value, error } = joiSchema.validate({ name, phone, city, college }, { escapeHtml: true })
    return { value, error }
}

module.exports = { accountInfoValidation }