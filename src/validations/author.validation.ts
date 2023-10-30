import Joi from "joi";

const author = Joi.object({
    firstName: Joi.string().max(100).required(),
    familyName: Joi.string().max(100).required(),
    books: Joi.array().items(Joi.string()).optional()
});

export default { author };