import React from "react";

import nothing from "../assets/nothing2.svg";

export default function NoChatAvailable() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-8  dark:bg-[#121212] rounded-md">
      <img className="w-[40%]" src={nothing} />
      <div>
        <h1 className="text-3xl font-semibold">No Room is Selected</h1>
      </div>
    </div>
  );
}
