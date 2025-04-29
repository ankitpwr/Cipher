import useUserDetailsStore from "@/store/userDetails";

import React from "react";
import { Badge } from "./ui/badge";
import moment from "moment";

export default function MessageBox(props) {
  const user = useUserDetailsStore((state) => state.user);
  return (
    <div className="w-full">
      {user.id != props?.from ? (
        <div className="flex flex-col items-start pb-0.5 ">
          {" "}
          <Badge variant="outline">
            <h2 className="text-xs"> {props.username}</h2>
          </Badge>
        </div>
      ) : (
        <div className="flex flex-col items-end pb-0.5">
          {" "}
          <Badge variant="outline">
            <h2 className="text-xs"> You</h2>
          </Badge>
        </div>
      )}
      <div
        className={`flex gap-3 p-3 rounded-lg shadow-sm md:rounded-lg  md:text-md text-sm     ${
          user.id == props?.from
            ? " bg-[rgb(119,121,237)] dark:bg-white dark:text-black text-white rounded-tr-none md:rounded-tr-none "
            : " bg-[#eeeffa] text-gray-800 rounded-tl-none md:rounded-tl-none "
        }`}
      >
        {props.message}
      </div>
      <div
        className={`mt-0.5 pr-2 text-right text-xs text-gray-700 dark:text-gray-100 opacity-80`}
      >
        {moment(props.timestamp).format(`hh:mm A`)}
      </div>
    </div>
  );
}
