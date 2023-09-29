import { expressjwt as jwt } from "express-jwt";

import { Request, Response, NextFunction } from "express";
import { Users } from "../models/users";
import { RefreshToken } from "../models/refreshtoken";

// const shouldMockReturn = process.env.NODE_ENV === "test";

export const authorize = () => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  // if (typeof roles === 'string') {
  //     roles = [roles];
  // }

  // if (shouldMockReturn) {
  //   return [(req: Request, res: Response, next: NextFunction) => next()];
  // }

  return [
    // authenticate JWT token and attach user to request object (req.auth)
    jwt({ secret: process.env.JWT_SECRET!, algorithms: ["HS256"] }),

    async (req: any, res: Response, next: NextFunction) => {
      const user = req.auth.account;
      const account = await Users.findByPk(user?.id);
      
      if (!account) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: "Unauthorized", status: 401 });
      }

      const refreshTokens = await RefreshToken.findOne({
        where: { userId: account.id },
      });

      if (!refreshTokens) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: "Unauthorized", status: 401 });
      }

      

      //   authentication and authorization successful
      // user.ownsToken = (token: string) =>
      //   !!refreshTokens.find((x: any) => x.token === token);
      user.ownsToken = refreshTokens.token
      req.userId = account.id
      next();
    },
  ];
};
