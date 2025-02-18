"use client";

import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex-1 flex flex-col gap-2 items-center justify-center">
      <FaTimes className="w-32 h-32 text-red-500" />
      <p className="text-2xl">Something went wrong</p>
      <p className="text-lg">Please try again</p>
    </div>
  );
};

export default Error;
