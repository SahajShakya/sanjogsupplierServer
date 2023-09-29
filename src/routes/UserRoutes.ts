import * as express from "express";
import { ConstantRoutes } from "../constants/ConstantRoutes";
import { authorize } from "../middleware/authorize";
import {

  deleteUser,
  getUsers,
  getSingleUser,
  addUser,
  updateUser,

} from "../controllers/UsersController";

const router = express.Router();
const { user } = ConstantRoutes;

// @method: GET
// @route: /users
// @desc: Get all usertype
router.get(user.getRoute, authorize(), getUsers);

// @method: GET
// @route: /users
// @desc: Get all usertype

router.post(user.postRoute, authorize(), addUser);
// @method: PUT
// @route: /user
// @desc: Update usertype
router.put(user.putRoute, authorize(), updateUser);
// @method: GET
// @route: /user/:id
// @desc: Get Single user
router.get(user.getSingleRoute, authorize(), getSingleUser);
// @method: DELETE
// @route: /user/:id
// @desc: Delete user
router.delete(user.deleteRoute, authorize(), deleteUser);

export default router;
