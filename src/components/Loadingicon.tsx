"use client";

import { motion } from "framer-motion";

interface LoadingIconProps {
  center?: boolean;
}

const LoadingIcon = ({ center }: LoadingIconProps) => {
  return (
    <div
      className={`${center ? "flex-1" : ""} flex items-center justify-center`}
    >
      <svg width="180" height="180" viewBox="-90 -90 180 180">
        <motion.line
          x1="-40"
          y1="-23.094"
          x2="40"
          y2="-23.094"
          stroke="#bfdbfe"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ y1: -23.094, y2: -23.094 }}
          animate={{ y1: 23.094, y2: 23.094 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.line
          x1="-40"
          y1="-23.094"
          x2="0"
          y2="40"
          stroke="#bfdbfe"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ x1: -40, y1: -23.094, x2: 0, y2: 46.188 }}
          animate={{ x1: 0, y1: -46.188, x2: 40, y2: 23.094 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.line
          x1="40"
          y1="-35"
          x2="0"
          y2="40"
          stroke="#bfdbfe"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ x1: 40, y1: -23.094, x2: 0, y2: 46.188 }}
          animate={{ x1: 0, y1: -46.188, x2: -40, y2: 23.094 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

export default LoadingIcon;
