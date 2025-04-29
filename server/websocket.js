import "dotenv/config";
// import { WebSocketServer } from "ws";
import WebSocket from "ws";
import url from "url";
import redis from "./config/redisDB.js";
import { v4 as uuidv4 } from "uuid";

// const PORT = process.env.PORT_WS || 8080;
// const wss = new WebSocketServer({ host: "0.0.0.0", port: PORT });

export default function setupWebsockets(wss) {
  const clientMap = new Map();

  const joinRoom = async (roomId, subscriber, subscribedRooms) => {
    if (!subscribedRooms.has(roomId)) {
      await subscriber.subscribe(`room:${roomId}`); //subscribes the Redis client to the channel named "room:" + roomId
      subscribedRooms.add(roomId);
    }
  };

  const storeMessage = async (roomId, payload) => {
    const timestamp = Date.now();

    const sortedSetKey = `room:${roomId}:messages`;
    await redis.zadd(sortedSetKey, timestamp, payload);
  };

  const handleMessage = async (
    e,
    userId,
    senderSocket,
    subscriber,
    subscribedRooms
  ) => {
    try {
      const parseData = JSON.parse(e.toString());

      if (parseData.type === "join") {
        const targetRoom = parseData.roomId;
        if (targetRoom) {
          await joinRoom(targetRoom, subscriber, subscribedRooms);
          senderSocket.send(
            JSON.stringify({ type: "Joined successfully", roomId: targetRoom })
          );
        } else {
          senderSocket.send(
            JSON.stringify({
              type: "error",
              message: "Room is currently unavailable",
            })
          );
        }
      } else if (parseData.type === "message") {
        const message = parseData.message;
        const targetRoom = parseData.roomId;
        const username = parseData.username;
        const messageId = uuidv4();

        if (!targetRoom || !message) {
          return senderSocket.send(
            JSON.stringify({
              type: "error",
              message: "room or message is not present",
            })
          );
        }

        const payload = JSON.stringify({
          type: "message",
          messageId: messageId,
          from: userId,
          roomId: targetRoom,
          message: message,
          timestamp: Date.now(),
          username: username,
        });

        await storeMessage(targetRoom, payload);
        await redis.publish(`room:${targetRoom}`, payload); //publishes the payload onto the Redis channel associated with the target room

        setTimeout(async () => {
          const sortedSetKey = `room:${targetRoom}:messages`;

          await redis.zrem(sortedSetKey, payload);
          const delMsg = JSON.stringify({
            type: "delete",
            roomId: targetRoom,
            messageId: messageId,
          });
          await redis.publish(`room:${targetRoom}`, delMsg);
        }, 60 * 1000);
      } else {
        senderSocket.send(
          JSON.stringify({
            type: "error",
            message: "could not able to send message",
          })
        );
      }
    } catch (error) {
      senderSocket.send(
        JSON.stringify({ type: "error", message: "Invalid message format" })
      );
    }
  };

  wss.on("connection", (socket, req) => {
    const { userId, username } = url.parse(req.url, true).query;
    if (!userId) {
      socket.close(1008, "user Id required");
      return;
    }

    clientMap.set(userId, socket);

    const subscriber = redis.duplicate(); //new Redis client connection which is then used exclusively for subscribing to channels
    let subscribedRooms = new Set();

    subscriber.on("message", (channel, message) => {
      //means that whenever the subscriber receives a message on any subscribed channel (which corresponds to a room), it checks that the WebSocket connection is still open and then sends that message over to the client
      if (socket.readyState == WebSocket.OPEN) {
        socket.send(message);
      }
    });

    socket.on("message", (e) => {
      return handleMessage(e, userId, socket, subscriber, subscribedRooms);
    });

    socket.on("close", async () => {
      for (const roomId of subscribedRooms) {
        await subscriber.unsubscribe(`room:${roomId}`);
      }
      subscriber.quit();
      clientMap.delete(userId);
      subscribedRooms.delete;
    });
  });
}
