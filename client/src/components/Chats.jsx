import useCurrentRoomStore from "@/store/currentRoom";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useUserDetailsStore from "@/store/userDetails";
import { ScrollArea } from "./ui/scroll-area";

export default function Chats() {
  const messageEndRef = useRef(null);
  const user = useUserDetailsStore((state) => state.user);
  const currentRoomChat = useCurrentRoomStore(
    (state) => state.currentRoomChats
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentRoomChat]);

  return (
    <div className="w-full px-6 pb-4 pt-6 gap-12 flex flex-col h-[100vh] overflow-y-auto bg-white dark:bg-[#121212]  ">
      <ScrollArea></ScrollArea>
      <AnimatePresence>
        {currentRoomChat.map((chatData, index) => {
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: user.id == chatData?.from ? 50 : -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                },
              }}
              viewport={{ once: true }}
              className={` flex whitespace-pre-wrap  ${
                user.id == chatData?.from ? "self-end " : "self-start"
              }`}
            >
              <MessageBox
                message={chatData?.message}
                from={chatData?.from}
                username={chatData.username}
                timestamp={chatData.timestamp}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div ref={messageEndRef} />
    </div>
  );
}
