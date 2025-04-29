import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://192.168.31.43:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

import userRouter from "./routes/userRoute.js";
import roomRouter from "./routes/roomRoute.js";

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);

app.listen(3000, "0.0.0.0");
