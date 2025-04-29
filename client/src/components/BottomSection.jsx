import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import usejoinedRoomsStore from "@/store/joinedRooms";
import useUserDetailsStore from "@/store/userDetails";
import RoomBox from "./RoomBox";
import { Skeleton } from "./ui/skeleton";

export default function BottomSection(props) {
  const AlljoinedRooms = usejoinedRoomsStore((state) => state.rooms);
  const fetchRoom = usejoinedRoomsStore((state) => state.fetchRooms);

  const loading = usejoinedRoomsStore((state) => state.loading);

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <div className="flex flex-col min-h-0 flex-4 bg-white dark:bg-[#121212] rounded-lg py-2 ">
      <div className="flex flex-col items-center py-2 shrink-0">
        <h1 className="text-2xl font-bold dark:text-white">My Rooms</h1>
      </div>

      <div className=" flex flex-col flex-1 min-h-0 overflow-y-auto px-4 gap-4 ">
        <ScrollArea className="h-full py-1 ">
          {!loading ? (
            <div className="flex flex-col gap-4 px-6 md:px-2 py-2">
              {AlljoinedRooms.map((roomData, index) => {
                return (
                  <RoomBox
                    key={index}
                    roomId={roomData.room.id}
                    roomName={roomData.room.roomName}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-6 md:px-2 py-2">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-80" />
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
