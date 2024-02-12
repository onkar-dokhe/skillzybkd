const Joi = require('joi');

const createBannerValidation = ({ image, url, showOnHomePage, description }) => {
    const joiSchema = Joi.object().keys({
        image: Joi.string().required().messages({
            "string.base": `image should be a type of String`,
            "string.empty": `image cannot be an empty field`,
            "any.required": `image is required.`,
        }),
        description: Joi.string().messages({
            "string.base": `description should be a type of String`,
            "string.empty": `description cannot be an empty field`,
        }),
        url: Joi.string().required().messages({
            "string.base": `url should be a type of String`,
            "string.empty": `url cannot be an empty field`,
            "any.required": `url is required.`,
        }),
        showOnHomePage: Joi.boolean().required().messages({
            "boolean.base": `showOnHomePage should be a type of Boolean`,
            "any.required": `showOnHomePage is required.`,
        })
    })
    const { value, error } = joiSchema.validate({ image, url, showOnHomePage, description }, { escapeHtml: true })
    return { value, error }
}

const updateBannerValidation = ({ image, url, showOnHomePage, description }) => {
    const joiSchema = Joi.object().keys({
        image: Joi.string().messages({
            "string.base": `image should be a type of String`,
            "string.empty": `image cannot be an empty field`,
        }),
        description: Joi.string().messages({
            "string.base": `description should be a type of String`,
            "string.empty": `description cannot be an empty field`,
        }),
        url: Joi.string().messages({
            "string.base": `url should be a type of String`,
            "string.empty": `url cannot be an empty field`,
        }),
        showOnHomePage: Joi.boolean().messages({
            "boolean.base": `showOnHomePage should be a type of Boolean`,
        })
    })
    const { value, error } = joiSchema.validate({ image, url, showOnHomePage, description }, { escapeHtml: true })
    return { value, error }
}

module.exports = { createBannerValidation, updateBannerValidation }
