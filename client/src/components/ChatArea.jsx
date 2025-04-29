import React from "react";

import NoChatAvailable from "./NoChatAvailable";
import Chats from "./Chats";
import useCurrentRoomStore from "@/store/currentRoom";
import ChatTopbar from "./ChatTopbar";
import ChatBottombar from "./ChatBottombar";

export default function ChatArea(props) {
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  return (
    <div className=" flex flex-col  w-full h-full px-2 py-2 pl-1  dark:bg-black bg-[rgb(34,32,36)]   ">
      {currentRoom && <ChatTopbar />}
      {currentRoom ? <Chats /> : <NoChatAvailable />}
      {currentRoom && <ChatBottombar />}
    </div>
  );
}
