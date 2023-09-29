import Joi, { allow } from "joi";

export const AuthValidator = {
  loginUser: (data: any) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).unknown(true);
    return schema.validate(data);
  },
  registerUser: (data: any) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(5).max(255),
    }).unknown(true);
    return schema.validate(data);
  },
  forgotPassword: (data: any) => {
    const schema = Joi.object({
      email: Joi.string().required(),
    }).unknown(true);
    return schema.validate(data);
  },
  resetPassword: (data: any) => {
    const schema = Joi.object({
      password: Joi.string().required().label("Password"),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
    }).unknown(true)
    return schema.validate(data);
  },

  changePassword: (data: any) => {
    const schema = Joi.object({
      oldPassword: Joi.string().required().label("Required"),
      password: Joi.string().required().label("Password"),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
    }).unknown(true)
    return schema.validate(data);
  },
};
