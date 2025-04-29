import { Github, Heart, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <div className="w-full  px-6  flex m-auto justify-between items-center py-2  ">
      <div>
        <h1 className=" flex text-xs md:text-sm gap-1">
          Made with {<Heart size={18} stroke="red" />} for privacy
        </h1>
      </div>
      <div className="flex gap-6">
        <Twitter className="cursor-pointer" />
        <Github className="cursor-pointer" />
      </div>
    </div>
  );
}
