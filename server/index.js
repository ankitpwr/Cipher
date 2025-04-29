import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import setupWebsockets from "./websocket.js";

dotenv.config();
const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
setupWebsockets(wss);

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

import userRouter from "./routes/userRoute.js";
import roomRouter from "./routes/roomRoute.js";

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);

server.listen(PORT, "0.0.0.0");
