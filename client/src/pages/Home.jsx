import ChatArea from "@/components/ChatArea";
import SideBar from "@/components/SideBar";

import useCurrentRoomStore from "@/store/currentRoom";
import usesocketDetails from "@/store/socketDetails";
import useUserDetailsStore from "@/store/userDetails";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const wsURL = import.meta.env.VITE_WEBSOCKET_URL;

export default function Home() {
  const [showMobileChat, setshowMobileChat] = useState(false);
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);
  const fetchUser = useUserDetailsStore((state) => state.fetchUser);
  const user = useUserDetailsStore((state) => state.user);
  const setSocket = usesocketDetails((state) => state.setSocket);
  const addChat = useCurrentRoomStore((state) => state.addChat);
  const removeChat = useCurrentRoomStore((state) => state.removeChat);
  const invalidUser = useUserDetailsStore((state) => state.InvalidUser);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!user || !user?.id) {
      return;
    }

    const ws = new WebSocket(`${wsURL}/?userId=${user.id}`);
    setSocket(ws);

    ws.addEventListener("open", () => {
      console.log("connected");
    });

    ws.addEventListener("message", ({ data }) => {
      const event = JSON.parse(data);

      if (event.type == "message") {
        addChat(event);
      } else if (event.type == "delete") {
        console.log(`delete the message ${event.message}`);
        removeChat({ roomId: event.roomId, messageId: event.messageId });
      }
    });

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("closed");
        ws.close();
      }
    };
  }, [user]);

  useEffect(() => {
    if (invalidUser) {
      navigate("/login");
    }
  }, [invalidUser, navigate]);

  if (!user) {
    return (
      <div className="w-full h-[100dvh] flex relative  ">
        {" "}
        <Loader2 className=" animate-spin absolute top-1/2 left-1/2" />
      </div>
    );
  }

  return (
    <div className="flex font-primary h-[100dvh]">
      <div
        className={`fixed w-full ${
          currentRoom ? "hidden" : "flex"
        } md:flex md:w-96  h-full bg-red-50`}
      >
        <SideBar showChat={setshowMobileChat} />
      </div>
      <div
        className={`ml-0 ${
          currentRoom ? "flex" : "hidden"
        } md:flex md:ml-96 flex-grow h-full `}
      >
        <ChatArea showChat={setshowMobileChat} />
      </div>
    </div>
  );
}
