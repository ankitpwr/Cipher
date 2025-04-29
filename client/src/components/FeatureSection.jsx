import React from "react";

import { Eye, MessageCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureSection() {
  return (
    <div className="w-4/5 m-auto flex flex-col md:flex-row justify-between items-center bg-white/50 dark:bg-transparent  space-y-10 md:space-y-0 md:space-x-16  pb-6 md:py-22 ">
      <motion.div className=" px-4 cursor-pointer pt-6 pb-10 h-66 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-2px border-gray-400 dark:border-gray-700/30 hover:scale-105 transition-transfrom duration-300 shadow-lg">
        <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/50 flex mx-auto items-center justify-center ">
          <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400 " />
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white ">
          Anonymous
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center py-3 ">
          Share your thoughts without revealing your identity.
        </p>
      </motion.div>
      <div className="group px-4 cursor-pointer  pt-6 pb-10 h-66 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-2px border-gray-400 dark:border-gray-700/30 hover:scale-105 transition-transfrom duration-300 shadow-lg">
        <div className="w-12 h-12 mb-4 rounded-full  bg-blue-100 dark:bg-blue-900/50 flex mx-auto items-center justify-center group-hover:animate-float">
          <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 " />
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white ">
          Ephemeral
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center py-3 ">
          Messages vanishes, leaving no digital footprint
        </p>
      </div>
      <div className="group px-4 cursor-pointer  pt-6 pb-10 h-66 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-2px border-gray-400 dark:border-gray-700/30 hover:scale-105 transition-transfrom duration-300 shadow-lg">
        <div className="w-12 h-12 mb-4 rounded-full bg-green-100 dark:bg-green-900/50 flex mx-auto items-center justify-center group-hover:animate-float">
          <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white ">
          Instant
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center py-3 ">
          Real-time communication with minimal latency
        </p>
      </div>
    </div>
  );
}

{
  /* <div class="relative h-full w-full bg-black"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div><div class="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div></div> */
}
