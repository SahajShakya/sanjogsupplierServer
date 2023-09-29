import * as Joi from "joi";

export const UserTypeValidator = {
  addUserType: (data: any) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    }).unknown(true);
    return schema.validate(data);
  },
  updateUserType: (data: any) => {
    const schema = Joi.object({
      id: Joi.number().forbidden(),
    })
      .min(1)
      .unknown(true);
    return schema.validate(data);
  },
};
