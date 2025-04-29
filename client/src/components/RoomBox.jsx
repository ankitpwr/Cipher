import useCurrentRoomStore from "@/store/currentRoom";
import usesocketDetails from "@/store/socketDetails";
import React, { useState } from "react";
import { toast } from "sonner";

export default function RoomBox(props) {
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);
  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);
  const fetchChat = useCurrentRoomStore((state) => state.fetchRoomChat);
  const socket = usesocketDetails((state) => state.socket);

  const handleClick = async () => {
    setCurrentRoom({ roomName: props.roomName, roomId: props.roomId });
    try {
      const event = {
        type: "join",
        roomId: props.roomId,
      };

      socket.send(JSON.stringify(event));
      await fetchChat(props.roomId);
    } catch (error) {
      toast.error("failed to join the room . try again");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex w-full px-4 py-2 md:py-3  cursor-pointer rounded-lg hover:bg-[#a1a3fd] hover:text-white dark:text-black dark:hover:text-white hover:scale-105 transition-transform duration-300 ${
        currentRoom?.roomId == props.roomId
          ? "bg-[#7678ed] text-white dark:text-white  "
          : "text-black dark:text-white"
      }`}
    >
      <h1> {props.roomName} </h1>
    </div>
  );
}
