import { Request, Response } from "express";
import { normalizeErr } from "../utils/NormalizeErrRes";
import { normalizeResp } from "../utils/NormalizeResp";
import {
  authenticate,
  hash,
  randomTokenString,
  refreshToken,
  register,
  revokeToken,
  verifyEmail,
} from "../utils/AuthUtils";
import { Users } from "../models/users";
import { AddUserTypeProps } from "../types/UserTypesProps";
import { UserTypes } from "../types/UserTypes";
import { ResetPassword } from "../models/resetpassword";
import moment from "moment";
import Email from "../libs/email/email";
import { Op } from "sequelize";
import { AuthValidator } from "../validators/AuthValidator";
import { ErrorType, NotFoundError, ValidationError } from "../errors/error";
import { ChangePwTypes } from "../types/ChangePwProps";
import bcrypt from "bcryptjs";

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip;
    const account = await authenticate({ email, password, ipAddress: ip });
    normalizeResp({ data: account, responseType: "get", res });
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    console.log(req.headers.origin);
    await register(req.body, req.headers.origin!);
    normalizeResp({
      data: "Registration successful",
      responseType: "post",
      res,
    });
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: "notFound", res });
  }
};

export const RefetchRefreshToken = async (req: Request, res: Response) => {
  try {

    const { token } = req.body;
    const ip = req.ip;
    const account = await refreshToken({ token, ipAddress: ip });
    normalizeResp({ data: account, responseType: "get", res });
  } catch (error: any) {
    console.log(error);

    normalizeErr({ data: error.message, errorType: "notFound", res });
  }
};

//--------- Resetting and forgot password -----------

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { error } = AuthValidator.forgotPassword(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
    const { email } = req.body as UserTypes;
    const user = await Users.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new ValidationError("Email doesn't exist");
    }
    const resetToken = randomTokenString();
    const resetPassord = await ResetPassword.create({
      email: email,
      token: resetToken,
      expiredAt: moment().add(3, "days"),
    });

    //send Email
    const url = `${process.env.HOST_URL}/resetpassword/${resetToken}`;
    if (user) await new Email({email: email, firstName:user.firstName, lastName:user.lastName, password:'' }, url).sendPasswordResetToken();

    normalizeResp({
      data: "You will receive a reset email if user with that email exist",
      responseType: "post",
      res,
    });
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};

//Reset password
export const SendResetPassword = async (req: Request, res: Response) => {
  try {
    const { error } = AuthValidator.resetPassword(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    const token = req.params.resetToken;
    const { password } = req.body as UserTypes;
    const resetPassword = await ResetPassword.findOne({
      where: {
        token: token,
        expiredAt: {
          [Op.gt]: new Date(),
        },
      },
      order: [["id", "DESC"]],
    });

    if(!resetPassword){
      throw new ValidationError('Token is invalid')

    }

    const user = await Users.findOne({
      where:{email: resetPassword?.email}
    })
    if(!user){
      throw new NotFoundError('Users not found')
    }

    if (user) {
      user.password = hash(password);
      await user.save();
    }
    normalizeResp({
      data: "Your Password has been changed successfully",
      responseType: "post",
      res,
    });
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};


export const ChangePassword = async (req: Request, res: Response) => {
  try {
    const { error } = AuthValidator.changePassword(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
    const { oldPassword, password, userId } = req.body as ChangePwTypes;
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new ValidationError("Password doesn't exist");
    }

    const bPssword = await bcrypt.compare(oldPassword, user.password)
    if(!bPssword){
      throw new ValidationError("Password doesn't exist");
    }

    user.password = hash(password)
    user.save()


    normalizeResp({
      data: "Your password is changed.",
      responseType: "post",
      res,
    });
  } catch (error: any) {
    normalizeErr({ data: error.message, errorType: error.errorType, res });
  }
};