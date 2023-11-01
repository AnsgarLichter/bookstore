import Joi from "joi";

const isbnRegex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?↵[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

const book = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().regex(isbnRegex).required(),
    author: Joi.string().required()
})

export default { book };