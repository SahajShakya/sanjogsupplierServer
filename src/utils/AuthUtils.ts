import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../helpers/SendEmail";
import { AuthValidator } from "../validators/AuthValidator";
import { Users } from "../models/users";
import { RefreshToken } from "../models/refreshtoken";
import { ValidationError } from "../errors/error";

// Auth portion when logining in
export const authenticate = async ({
  email,
  password,
  ipAddress,
}: {
  email: string;
  password: string;
  ipAddress: string | number;
}) => {
  const { error } = AuthValidator.loginUser({ email, password });
  if (error) throw new ValidationError(error.details[0].message);
  const user = await Users.findOne({
    where: { email },
  });
  const isPasswordValid =
    user && (await bcrypt.compare(password, user.password));
  if (!user || !isPasswordValid) {
    throw new ValidationError("Email or password is incorrect");
  } else {

    if(!user){
      throw new ValidationError("User is not active");
    }

    // Auth success so generate a jwt token and refresh token
    const jwtToken = generateJwtToken(user);
    const refreshToken = await generateRefreshToken(user, ipAddress);

    // return data
    return {
      ...basicDetails(user),
      "token":jwtToken,
      "refresh":refreshToken,
    };
  }
};

// refetching refresh token
export const refreshToken = async ({
  token,
  ipAddress,
}: {
  token: string;
  ipAddress: string;
}) => {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = await generateRefreshToken(user, ipAddress);
  refreshToken.revoked = new Date();
  refreshToken.revokedByIp = ipAddress;
  // refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
};

// Revoke token
export const revokeToken = async ({
  token,
  ipAddress,
}: {
  token: string;
  ipAddress: string | number;
}) => {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  // refreshToken.revoked = Date.now();
  // refreshToken.revokedByIp = ipAddress;
  // await refreshToken.save();
};

// Create a new user
export const register = async (params: any, origin: string) => {
  const { error } = AuthValidator.registerUser(params);
  if (error) {
    throw new Error(error.details[0].message);
  }

  params.verified = 1;
  // validate
  if (!await Users.findOne({ where: { email: params.email } })) {
    // send already registered error in email to prevent account enumeration
    // create account object
  const account = await Users.create(params);

  // hash password
  account.verificationToken = randomTokenString();
  account.password = hash(params.password);

  // save account
  await account.save();
  }
  else {
    throw new Error('Email already exists');
  }


  // send email
  //await sendVerificationEmail(account, origin);
};

// Verify email
export const verifyEmail = async ({ token }: { token: string }) => {
  const account = await Users.findOne({ where: { verificationToken: token } });

  if (!account) throw "Verification failed";

  account.verified = true;
  account.verificationToken = randomTokenString();
  await account.save();
};

// small functions
const generateJwtToken = (account: Users) => {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ account }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const  randomTokenString = () => {
  return crypto.randomBytes(40).toString("hex");
}

const generateRefreshToken = async (
  account: Users,
  ipAddress: string | number | any
) => {
  // create a refresh token that expires in 7 days
  return await RefreshToken.create({
    userId: account.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    isExpired: false,
    isActive: true,
    createdByIp: ipAddress,
  });
};

const basicDetails = (account: Users) => {
  return {
    id: account.id,
    email: account.email
  };
};

const getRefreshToken = async (token: string) => {
  const refreshToken = await RefreshToken.findOne({
    where: {
      token: token,
    },
    include: [Users],
  });
  if (!refreshToken || !refreshToken.isActive) throw new Error("Invalid token");
  return refreshToken;
};

const sendAlreadyRegisteredEmail = async (email: string, origin: string) => {
  let message;
  if (origin) {
    message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
  } else {
    message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
  }

  await sendEmail({
    to: email,
    subject: "Sign-up Verification API - Email Already Registered",
    html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
  });
};

const sendVerificationEmail = async (account: any, origin: string) => {
  let message;
  if (origin) {
    const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
    message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: "Sign-up Verification API - Verify Email",
    html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`,
  });
  console.log("Verification email sent.");
};

// Hash password
export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
