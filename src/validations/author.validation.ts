import Joi from "joi";

const author = Joi.object({
    firstName: Joi.string().max(100).required(),
    familyName: Joi.string().max(100).required()
});

export default { author };