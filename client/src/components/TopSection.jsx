import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import InputBox from "./InputBox";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ModeToggle } from "./mode-toggle";
import useUserDetailsStore from "@/store/userDetails";
import axios from "axios";

import { Loader2 } from "lucide-react";
import useCurrentRoomStore from "@/store/currentRoom";
import usesocketDetails from "@/store/socketDetails";
import { toast } from "sonner";
import usejoinedRoomsStore from "@/store/joinedRooms";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function TopSection(props) {
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const newRoom = useCurrentRoomStore((state) => state.newRoom);
  const setnewRoom = useCurrentRoomStore((state) => state.setnewRoom);
  const socket = usesocketDetails((state) => state.socket);
  const fetchRoom = usejoinedRoomsStore((state) => state.fetchRooms);
  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);
  const inputJoinRef = useRef();
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      setLoading(true);
      let inputRoomID = inputJoinRef.current?.value;
      inputRoomID = inputRoomID.trim();
      if (!inputRoomID) {
        toast.error("Room ID is Empty");
        inputJoinRef.current.value = "";
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${baseURL}/api/room/join-room`,
        {
          roomId: inputRoomID,
        },
        { withCredentials: true }
      );
      inputJoinRef.current.value = "";
      setLoading(false);

      await fetchRoom();

      toast.success("Successfully Joined The Room");
    } catch (error) {
      setLoading(false);
      toast.error("failed to join");
      return;
    }
  };
  const handleCreateRoom = async () => {
    try {
      let roomName = inputRef.current?.value;
      roomName = roomName.trim();
      if (!roomName) {
        setLoading(false);
        toast.error("please fill a room Name");
        return;
      }
      inputRef.current.value = "";
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/api/room/create-new-room`,
        {
          roomName: roomName,
        },
        { withCredentials: true }
      );
      await setnewRoom({
        roomId: response.data.roomId,
        roomName: response.data.roomName,
      });
      const event = {
        type: "join",
        roomId: response.data.roomId,
      };
      await socket.send(JSON.stringify(event));
      await fetchRoom();
      toast.success("Room has created successfully");
    } catch (error) {
      toast.error("Cant create room ! Try again");
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = async () => {
    try {
      const toastId = toast.loading("Logging out");
      const response = await axios.post(
        `${baseURL}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.dismiss(toastId);
      setCurrentRoom(null);
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleCopy = async () => {
    let isCopy = copy(newRoom.roomId);
    if (isCopy) {
      toast.success("Copied successfully");
    }
  };

  return (
    <div className="flex-2 sm:flex-3 bg-white dark:bg-[#121212] rounded-lg   pb-4 ">
      <div className="flex relative pt-6 pb-3   justify-center gap-3">
        <h1 className="text-3xl md:text-4xl font-heading  dark:text-gray-100 ">
          Cipher
        </h1>
        <div className="absolute top-0.5 right-0.5">
          <ModeToggle />
        </div>
      </div>
      <div className="flex pt-3 flex-col items-center gap-3">
        <InputBox
          variant={"Secondary"}
          place={"Enter Room ID"}
          type={"text"}
          refer={inputJoinRef}
        ></InputBox>
        <Button
          onClick={handleJoin}
          className="md:w-68 sm:w-72  w-64 focus:border-gray-500 rounded-md py-6 hover:bg-[#8e8ffa] bg-[#7678ed] dark:text-white cursor-pointer hover:scale-101 transition-transform duration-300  "
        >
          {loading && inputJoinRef.current.value ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Join"
          )}
        </Button>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setnewRoom(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="md:w-68 sm:w-72  w-64 focus:border-gray-500 rounded-md py-6 hover:bg-[#8e8ffa]  bg-[#7678ed] dark:text-white  cursor-pointer hover:scale-101 transition-transform duration-300"
            >
              Create Room
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className=" flex w-full text-xl">
                {loading ? (
                  <div className="flex w-full justify-center ">
                    <h1>Please Wait</h1>
                  </div>
                ) : newRoom ? (
                  "Room Created successfully !"
                ) : (
                  "Create Room"
                )}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center sm:items-start gap-3 ">
              {loading ? (
                <div className="flex w-full items-center flex-col gap-3">
                  <Loader2 className="animate-spin" />
                </div>
              ) : newRoom ? (
                <InputBox
                  readOnly={true}
                  defaultValue={newRoom.roomName}
                  variant={"Secondary"}
                  place={"RoomName"}
                ></InputBox>
              ) : (
                <InputBox
                  refer={inputRef}
                  place={"Room name"}
                  type={"text"}
                  variant={"Secondary"}
                ></InputBox>
              )}

              {newRoom && (
                <div className="relative flex items-center gap-2 w-64 sm:w-96 md:w-78">
                  <InputBox
                    readOnly={true}
                    defaultValue={newRoom.roomId}
                    variant={"Secondary"}
                    place={"RoomId"}
                  ></InputBox>
                </div>
              )}
              <div className="">
                {newRoom ? (
                  <Button
                    onClick={handleCopy}
                    className="md:w-68 sm:w-72 w-64 focus:border-gray-500 rounded-md py-6 hover:bg-[#8e8ffa] bg-[#7678ed] dark:text-white  cursor-pointer"
                  >
                    Copy Room ID
                  </Button>
                ) : !loading ? (
                  <Button
                    onClick={handleCreateRoom}
                    className="md:w-68 sm:w-72 w-64 focus:border-gray-500 rounded-md py-6 hover:bg-[#8e8ffa] bg-[#7678ed] dark:text-white  cursor-pointer"
                  >
                    Generate
                  </Button>
                ) : (
                  <div />
                )}
              </div>

              {newRoom && (
                <p className="text-xs">
                  Copy this Room ID to invite friends into your room.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex flex-col justify-center">
          <Button
            onClick={handlelogout}
            className="md:w-68 sm:w-72 w-64 focus:border-gray-500 rounded-md py-6 hover:bg-[#8e8ffa]  bg-[#7678ed] dark:text-white  cursor-pointer hover:scale-101 transition-transform duration-300"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
