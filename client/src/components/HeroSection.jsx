import React from "react";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: 1, // Animation duration
        },
      }}
      viewport={{ once: true }}
      className="w-4/5 m-auto flex flex-col jutify-between items-center py-20"
    >
      <motion.h1
        className="text-center text-3xl sm:text-4xl md:text-6xl font-bold font-primary bg-gradient-to-tl
from-slate-600
via-violet-500
to-zinc-400
bg-clip-text
text-transparent"
      >
        Chat Freely, Disappear Instantly.
      </motion.h1>
      <div className="flex w-[70%] justify-center py-3">
        <p className="text-center text-base md:text-xl dark:text-gray-300 text-gray-600">
          Your private conversations, designed to vanish.
        </p>
      </div>
      <div className="py-3">
        <Button
          onClick={() => navigate("/register")}
          className="px-6 relative  py-5 cursor-pointer  "
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
}

{
  /* <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */
}
