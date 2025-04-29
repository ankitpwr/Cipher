import React, { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendSVG } from "@/assets/SVG";
import usesocketDetails from "@/store/socketDetails";
import { toast } from "sonner";
import useCurrentRoomStore from "@/store/currentRoom";
import useUserDetailsStore from "@/store/userDetails";

export default function ChatBottombar() {
  const inputRef = useRef();
  const socket = usesocketDetails((state) => state.socket);
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);
  const userDetails = useUserDetailsStore((state) => state.user);

  const handleClick = async () => {
    try {
      let data = inputRef.current?.value;
      data = data.trim();
      if (!data) {
        toast.error("message is empty");
        return;
      }
      const event = {
        type: "message",
        roomId: currentRoom.roomId,
        message: data,
        username: userDetails.username,
      };
      await socket.send(JSON.stringify(event));
      inputRef.current.value = "";
    } catch (error) {
      toast.error("Message is not Sent");
    }
  };
  return (
    <div className=" flex justify-between w-full items-center p-4 pt-0 gap-2 rounded-b-lg bg-white dark:bg-[#121212]">
      <Textarea
        autoComplete="off"
        placeholder="Type your message here."
        row={1}
        className=" border rounded-lg flex items-center resize-none overflow-hidden h-8 md:h-10 text-sm sm:text-md  "
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (inputRef.current?.value != "") {
              handleClick();
            }
          }
        }}
      />
      <Button
        onClick={handleClick}
        className=" h-16  bg-[#7678ed] hover:bg-[#8e8ffa] cursor-pointer dark:bg-white"
      >
        {" "}
        <SendSVG />{" "}
      </Button>
    </div>
  );
}
