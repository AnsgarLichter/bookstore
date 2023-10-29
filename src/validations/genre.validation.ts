import Joi from "joi";

const genre = Joi.object({
    name: Joi.string().min(3).max(100).required()
})

export default { genre };