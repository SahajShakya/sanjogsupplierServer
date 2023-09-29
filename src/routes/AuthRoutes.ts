import { Router } from "express";
import {
  LoginUser,
  RegisterUser,
  RefetchRefreshToken,
  SendResetPassword,
  ForgotPassword,
  ChangePassword,
} from "../controllers/AuthController";
import { ConstantRoutes } from "../constants/ConstantRoutes";
import { authorize } from "../middleware/authorize";

const router = Router();
const { auth } = ConstantRoutes;

router.post(auth.register, RegisterUser);
router.post(auth.login, LoginUser);
router.post(auth.refreshToken, RefetchRefreshToken);
router.post(auth.forgotPassword, ForgotPassword);
router.post(auth.resetPassword, SendResetPassword);
router.post(auth.changePassword, authorize(), ChangePassword);

export default router;
