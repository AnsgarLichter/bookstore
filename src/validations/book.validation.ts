import Joi from "joi";

const book = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required(),
    author: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).optional()
})

export default { book };