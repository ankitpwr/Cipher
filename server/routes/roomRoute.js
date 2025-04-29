import express from "express";
import {
  allRoomMemebers,
  createRoom,
  getAllMessage,
  getAllRooms,
  joinedRooms,
  joinRoom,
  leaveRoom,
  roomDetails,
} from "../controllers/roomController.js";
import authUser from "../middleware/authUser.js";

const roomRouter = express.Router();

roomRouter.post("/create-new-room", authUser, createRoom);
roomRouter.get("/room-details/:id", authUser, roomDetails);
roomRouter.post("/join-room", authUser, joinRoom);
roomRouter.get("/get-all-rooms", authUser, getAllRooms);
roomRouter.get("/get-all-room-members/:id", authUser, allRoomMemebers);
roomRouter.post("/leave-room", authUser, leaveRoom);
roomRouter.get("/get-message/:id", authUser, getAllMessage);
roomRouter.get("/get-joined-rooms", authUser, joinedRooms);

export default roomRouter;
