import { BlogWithLike, Like } from "@/types/types";
import { useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

interface LikeDislikeProps {
  blog: BlogWithLike;
}

const LikeDislike = ({ blog }: LikeDislikeProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [state, setState] = useState<"like" | "dislike" | "none">(blog.liked);
  const [likes, setLikes] = useState<number>(blog.likes);
  const [dislikes, setDislikes] = useState<number>(blog.dislikes);

  const onLike = async (
    state: "like" | "dislike" | "none",
    prevState: "like" | "dislike" | "none"
  ) => {
    if (!session) signIn("github");
    if (!blog._id || !session?.user?.email) return;
    setState(state);

    // Mocking the UI update
    if (state === "like") {
      if (prevState === "dislike") {
        setDislikes((prev) => prev - 1);
      }
      setLikes((prev) => prev + 1);
    } else if (state === "dislike") {
      if (prevState === "like") {
        setLikes((prev) => prev - 1);
      }
      setDislikes((prev) => prev + 1);
    } else if (state === "none") {
      if (prevState === "like") {
        setLikes((prev) => prev - 1);
      } else if (prevState === "dislike") {
        setDislikes((prev) => prev - 1);
      }
    }

    try {
      const body: Like = {
        blogId: blog._id,
        userEmail: session.user?.email,
        state: state,
      };
      const res = await axios.post("/api/likes", body);
      console.log(res.data);
    } catch (error) {
      console.error(error);
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
          onClick={() =>
            state === "like" ? onLike("none", state) : onLike("like", state)
          }
          className={`flex flex-row items-center gap-2 ${
            state === "like" ? "text-green-400" : "text-blue-200"
          }`}
        >
          <p className="mb-0">{likes}</p>
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
          onClick={() =>
            state === "dislike"
              ? onLike("none", state)
              : onLike("dislike", state)
          }
          className={`flex flex-row items-center gap-2 ${
            state === "dislike" ? "text-red-400" : "text-blue-200"
          }`}
        >
          <FaHeartBroken />
          <p className="mb-0">{dislikes}</p>
        </button>
      </div>
    </div>
  );
};

export default LikeDislike;
