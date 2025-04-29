import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

import userRouter from "./routes/userRoute.js";
import roomRouter from "./routes/roomRoute.js";

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);

app.listen(PORT, "0.0.0.0");
