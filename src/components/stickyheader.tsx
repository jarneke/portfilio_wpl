import { FaBars } from "react-icons/fa";
import { useState } from "react";

interface StickyHeaderProps {
  children?: React.ReactNode | React.ReactNode[];
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="sticky justify-end top-0 z-50 bg-neutral-900/70 backdrop-blur-md">
        <div className="p-5">
          <FaBars
            onClick={() => setOpen(!open)}
            className="cursor-pointer w-8 h-8 ms-auto me-0 z-50"
          />
        </div>
        <div
          className={`z-40 p-2 gap-2 absolute w-full flex flex-col sm:flex-row bg-neutral-800/80 items-center transition-all duration-300 ${
            open
              ? "transform translate-y-0 opacity-100 visible"
              : "transform -translate-y-full opacity-0 invisible"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default StickyHeader;
