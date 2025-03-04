import { FaBars, FaBook, FaHome, FaTimes, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "./Loadingicon";
import Error from "./Error";
import { GitResponse } from "@/types/types";

interface StickyHeaderProps {
  children?: React.ReactNode | React.ReactNode[];
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const {
    data: userName,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<string | undefined> => {
      if (!session?.user?.email) return undefined;

      const { data } = await axios.get<GitResponse>(
        `https://api.github.com/search/users?q=${session?.user?.email}+in:email`
      );

      return data.items[0].login;
    },
    queryKey: ["userName", session?.user?.email],
    enabled: !!session?.user?.email,
  });

  return (
    <div className="sticky justify-end top-0 z-50 bg-neutral-900/70 backdrop-blur-md">
      <div className="flex gap-5 p-5">
        <Link href="/" className="font-bold no-underline">
          Eldrup Jarne
        </Link>
        <div className="relative ms-auto">
          {session ? (
            <img
              src={session?.user?.image as string}
              alt="profile image"
              className="w-8 h-8 rounded-full relative"
              onClick={() => setProfileOpen(!profileOpen)}
            />
          ) : (
            <FaUser
              className="w-8 h-8 relative"
              onClick={() => setProfileOpen(!profileOpen)}
            />
          )}

          {profileOpen && (
            <>
              <div className="absolute top-[calc(100%+20px)] transform -translate-x-1/2 left-1/2 z-50">
                <div className="absolute top-[-10px] transform -translate-x-1/2 left-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-neutral-800" />
                <div className="w-40 h-fit bg-neutral-800 p-4 rounded-md">
                  {session ? (
                    <div className="flex flex-col gap-4">
                      <Link
                        href={`https://github.com/${userName}`}
                        target="_blank"
                      >
                        {`${session?.user?.name}`}
                      </Link>
                      <button className="w-full">
                        <div
                          className="underline text-center"
                          onClick={() => signOut()}
                        >
                          Logout
                        </div>
                      </button>
                    </div>
                  ) : session && isLoading ? (
                    <LoadingIcon />
                  ) : session && isError ? (
                    <Error
                      size={"sm"}
                      icon
                      message="Check your internet connection and refresh the page"
                    />
                  ) : (
                    <div
                      className="underline text-center"
                      onClick={() => signIn("github")}
                    >
                      Login
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {open ? (
          <FaTimes
            onClick={() => setOpen(!open)}
            className="cursor-pointer w-8 h-8 me-0 z-50"
          />
        ) : (
          <FaBars
            onClick={() => setOpen(!open)}
            className="cursor-pointer w-8 h-8 me-0 z-50"
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
  );
};

export default StickyHeader;
