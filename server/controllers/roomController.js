import { PrismaClient } from "@prisma/client";
import redis from "../config/redisDB.js";
const client = new PrismaClient();
const EPHEMERAL_PERIOD = 1 * 60 * 1000;

const createRoom = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    const roomData = await client.room.create({
      data: {
        creatorId: userId,
        roomName: req.body.roomName,
        members: {
          create: {
            userId: userId,
          },
        },
      },
    });

    return res.status(200).json({
      message: " room is successfully created",
      roomId: roomData.id,
      roomName: roomData.roomName,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const roomDetails = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);

    if (!roomId) {
      return res.status(401).json({
        message: "room Id is not present",
      });
    }

    const roomData = await client.room.findFirst({
      where: {
        id: roomId,
      },
      include: {
        members: true,
      },
    });

    if (!roomData) {
      return res.status(400).json({
        message: "room Id is not valid",
      });
    }

    return res.status(200).json({
      message: roomData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const joinRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.body.roomId);
    if (!roomId) {
      return res.status(403).json({
        message: "cannot join room as Id is not present",
      });
    }

    const isValidID = await client.room.findFirst({
      where: {
        id: roomId,
      },
    });

    if (!isValidID) {
      return res.status(400).json({
        essage: "Invalid Room ID",
      });
    }
    const isAlreadyUser = await client.roomMember.findFirst({
      where: {
        roomId: roomId,
        userId: req.body.userId,
      },
    });

    if (isAlreadyUser) {
      return res.status(400).json({
        message: "you have already joined this room",
      });
    }

    const response = await client.roomMember.create({
      data: {
        userId: req.body.userId,
        roomId: roomId,
      },
    });
    return res.status(200).json({
      message: "successfully joined the room",
      roomId: roomId,
    });
  } catch (error) {
    return res.status(400).json({
      message: "unable to join this room",
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const allRooms = await client.room.findMany({
      where: {},
    });

    return res.status(200).json({
      message: allRooms,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const allRoomMemebers = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    const roomMembers = await client.roomMember.findMany({
      where: {
        roomId: roomId,
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({
      message: roomMembers, // message is array of
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const joinedRooms = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        message: "Could'nt fetched the rooms",
      });
    }
    const rooms = await client.roomMember.findMany({
      where: {
        userId: userId,
      },
      include: {
        room: true,
      },
    });

    return res.status(200).json({
      message: rooms,
    });
  } catch (error) {}
};

const leaveRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.body.roomId);
    const userId = req.body.userId;

    const isMemeber = await client.roomMember.findFirst({
      where: {
        userId: userId,
        roomId: roomId,
      },
    });
    if (!isMemeber) {
      return res.status(400).json({
        message: "You are not member of this room",
      });
    }

    await client.roomMember.delete({
      where: {
        userId_roomId: {
          userId: userId,
          roomId: roomId,
        },
      },
    });

    return res.status(200).json({
      message: "you have successfully left the room",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getAllMessage = async (req, res) => {
  const roomId = parseInt(req.params.id);

  if (!roomId) {
    return res.status(400).json({
      message: "Room Id is required",
    });
  }

  try {
    const currentTime = Date.now();
    const minValidScore = currentTime - EPHEMERAL_PERIOD;
    const sortedSetKey = `room:${roomId}:messages`;
    await redis.zremrangebyscore(sortedSetKey, 0, minValidScore);

    const message = await redis.zrange(sortedSetKey, 0, -1);
    const parsedMessages = message.map((msg) => JSON.parse(msg));

    return res.status(200).json({
      message: parsedMessages,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export {
  createRoom,
  roomDetails,
  joinRoom,
  getAllRooms,
  allRoomMemebers,
  leaveRoom,
  getAllMessage,
  joinedRooms,
};
