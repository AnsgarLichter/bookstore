import Joi from "joi";

const author = Joi.object({
    firstName: Joi.string().required(),
    familyName: Joi.string().required()
});

export default { author };