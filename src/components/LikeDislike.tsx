import { Blog } from "@/types/types";
import { useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

interface LikeDislikeProps {
  blog: Blog;
}

const LikeDislike = ({ blog }: LikeDislikeProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [state, setState] = useState<"like" | "dislike" | "none">("none");

  const onLike = async (like: boolean) => {
    if (!session) return router.push("/api/auth/signin");

    setState(like ? "like" : "dislike");
    try {
      const data = await axios.put<Blog>(`/api/blogs/${blog._id}`, { blog });
    } catch (error) {
      setState("none");
    }
  };
  return (
    <div className="flex flex-row bg-white/10 rounded-md p-0">
      <div
        className={`flex items-center p-2 rounded-l-md ${
          state === "like" && "bg-green-400/20"
        }`}
      >
        <button
          onClick={() => onLike(true)}
          className={`flex flex-row items-center gap-2 ${
            state === "like" ? "text-green-400" : "text-blue-200"
          }`}
        >
          <FaHeart />
        </button>
      </div>
      <div className="w-px h-full bg-white/10"></div>
      <div
        className={`flex items-center p-2 rounded-r-md ${
          state === "dislike" && "bg-red-400/20"
        }`}
      >
        <button
          onClick={() => onLike(false)}
          className={`flex flex-row items-center gap-2 ${
            state === "dislike" ? "text-red-400" : "text-blue-200"
          }`}
        >
          <FaHeartBroken />
        </button>
      </div>
    </div>
  );
};

export default LikeDislike;
