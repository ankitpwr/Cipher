import React from "react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";

export default function SideBar(props) {
  return (
    <div className="w-full h-full dark:bg-black min-h-0 bg-[rgb(34,32,36)] flex flex-col px-2 pr-1 py-2 gap-2">
      <TopSection />
      <BottomSection showChat={props.showChat} />
    </div>
  );
}
