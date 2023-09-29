import  Joi from "joi";

export const UsersValidator = {
  addUsers: (data: any) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      userTypeId: Joi.number().required(),
    }).unknown(true);
    return schema.validate(data);
  },
  updateUsers: (data: any) => {
    const schema = Joi.object({
      id: Joi.number().forbidden(),
    })
      .min(1)
      .unknown(true);
    return schema.validate(data);
  },
};
