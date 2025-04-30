import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const userDetails = await client.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: userDetails.id }, JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".onrender.com",
      path: "/",
      maxAge: 1000 * 60 * 60 * 168,
    });

    return res.status(200).json({
      message: "successfully Register",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userDetails = await client.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!userDetails) {
      return res.status(401).json({
        message: "user does not exist",
      });
    }

    const validatePassword = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!validatePassword) {
      return res.status(401).json({
        message: "password is invalid",
      });
    }

    const token = jwt.sign({ userId: userDetails.id }, JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".onrender.com",
      path: "/",
      maxAge: 1000 * 60 * 60 * 168,
    });

    return res.status(200).json({
      message: "successfully logged in",
      token: token,
    });
  } catch (error) {
    return res.json(400).json({
      message: "unable to login",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        domain: ".onrender.com",
        secure: true,
        maxAge: 0,
      })
      .status(200)
      .json({ message: "Logged out" });
  } catch (error) {
    return res.status(400).json({
      message: "failed to logout",
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const useData = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!useData) {
      return res.status(400).json({
        message: "no details of user",
      });
    }

    return res.status(200).json({
      message: useData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export { register, login, userDetails, logout };
