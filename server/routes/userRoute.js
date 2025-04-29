import express from "express";
import {
  login,
  logout,
  register,
  userDetails,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/user-details", authUser, userDetails);
userRouter.post("/logout", logout);

export default userRouter;
