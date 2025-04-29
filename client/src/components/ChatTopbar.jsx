import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import useCurrentRoomStore from "@/store/currentRoom";
import useUserDetailsStore from "@/store/userDetails";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import usejoinedRoomsStore from "@/store/joinedRooms";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function ChatTopbar() {
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);
  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);

  const fetchRoom = usejoinedRoomsStore((state) => state.fetchRooms);

  const handleLeave = async () => {
    try {
      const toastId = toast.loading("Leaving the room");
      const response = await axios.post(
        `${baseURL}/api/room//leave-room`,
        {
          roomId: currentRoom.roomId,
        },
        { withCredentials: true }
      );
      setCurrentRoom(null);
      await fetchRoom();
      toast.dismiss(toastId);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to leave the room ");
    }
  };
  return (
    <div className="w-full  h-24 flex items-center justify-between px-6 py-4 bg-[#7678ed] text-white dark:bg-[#121212]  border-b-1  dark:border-b-gray-300 rounded-t-md">
      <div className="flex  items-center gap-4">
        <Avatar className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 text-2xl text-gray-900 dark:text-gray-100 font-bold">
          <AvatarImage></AvatarImage>
          <AvatarFallback>
            {currentRoom.roomName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col  justify-center  dark:text-white gap-1">
          <h1 className=" text-lg md:text-xl font-semibold">
            {currentRoom.roomName}
          </h1>
          <Badge variant="secondary">
            <h2 className="text-xs">Room ID: {currentRoom.roomId}</h2>
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <Button
          onClick={handleLeave}
          className="text-black dark:text-white cursor-pointer"
          variant={"secondary"}
        >
          Leave
        </Button>
        <X size={30} onClick={() => setCurrentRoom(null)} />
      </div>
    </div>
  );
}
