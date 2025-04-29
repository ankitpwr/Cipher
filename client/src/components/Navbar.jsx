import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex w-4/5 m-auto justify-between py-4  items-center dark:text-white   "
    >
      <h1 className="text-3xl md:text-4xl font-heading hover:scale-105 transition-transform duration-300 cursor-pointer  ">
        Cipher
      </h1>
      <div className="flex gap-3">
        <ModeToggle />
        <Button className="cursor-pointer" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </motion.div>
  );
}
