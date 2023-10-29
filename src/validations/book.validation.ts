import Joi from "joi";

const book = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required()
})

export default { book };