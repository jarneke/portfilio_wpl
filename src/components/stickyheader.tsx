import { FaBars, FaBook, FaHome, FaTimes, FaUser } from "react-icons/fa";
import { useState } from "react";
import MenuItem from "./MenuItem";
import Link from "next/link";

interface StickyHeaderProps {
  children?: React.ReactNode | React.ReactNode[];
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="sticky justify-end top-0 z-50 bg-neutral-900/70 backdrop-blur-md">
        <div className="flex p-5">
          <p className="font-bold">Eldrup Jarne</p>
          {open ? (
            <FaTimes
              onClick={() => setOpen(!open)}
              className="cursor-pointer w-8 h-8 ms-auto me-0 z-50"
            />
          ) : (
            <FaBars
              onClick={() => setOpen(!open)}
              className="cursor-pointer w-8 h-8 ms-auto me-0 z-50"
            />
          )}
        </div>
        <div
          className={`z-40 p-2 gap-2 absolute w-full flex flex-col sm:flex-row bg-neutral-800/80 items-center transition-all duration-300 ${
            open
              ? "transform translate-y-0 opacity-100 visible"
              : "transform -translate-y-full opacity-0 invisible"
          }`}
        >
          {children ? (
            children
          ) : (
            <>
              <MenuItem>
                <Link
                  href={"/"}
                  className="w-full flex justify-center items-center gap-5"
                >
                  <FaHome className="w-5 h-5 text-blue-200" />
                  <span>Home</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href={"/about"}
                  className="w-full flex justify-center items-center gap-5"
                >
                  <FaUser className="w-5 h-5 text-blue-200" />
                  <span>About</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href={"/blogposts"}
                  className="w-full flex justify-center items-center gap-5"
                >
                  <FaBook className="w-5 h-5 text-blue-200" />
                  <span>Blogposts</span>
                </Link>
              </MenuItem>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StickyHeader;
