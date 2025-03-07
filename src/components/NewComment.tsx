import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { ObjectId } from "mongodb";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Comment } from "@/types/types";
import axios from "axios";

interface NewCommentProps {
  blogId: ObjectId;
  handleDismiss: () => void;
}
export default function NewComment({ handleDismiss, blogId }: NewCommentProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [comment, setComment] = useState<string>("");

  const dissmissNewComment = () => {
    handleDismiss();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    const newComment: Comment = {
      content: comment,
      date: new Date(),
      userEmail: session?.user?.email ?? "",
      blogId: blogId,
    };
    const res = await axios.post("/api/comments", newComment);
    if (res.status === 200) {
      dissmissNewComment();
    }
    router.reload();
  };

  if (status === "unauthenticated") signIn("github");
  return (
    <div className="flex flex-col justify-end">
      <div className="flex justify-between gap-2 w-full">
        <div className="flex gap-2 items-center">
          <img
            src={session?.user?.image ?? ""}
            alt={`${session?.user?.name ?? "User"}'s profile picture`}
            className="w-10 h-10 rounded-full"
          />
          <p className="mb-0">{session?.user?.name ?? "User"}</p>
        </div>
        <button onClick={() => dissmissNewComment()}>
          <FaTimes className="w-5 h-5 text-red-500" />
        </button>
      </div>

      <textarea
        className="w-full h-32 bg-inherit border-b-2 border-blue-200 mb-4 focus:outline-none scrollbar-thin scrollbar-thumb-blue-200"
        placeholder="..."
        onChange={(e) => handleChange(e)}
      ></textarea>

      <button
        className=" flex gap-2 items-center underline ms-auto me-0"
        onClick={handleSubmit}
      >
        <p className="mb-0">Post Comment</p>
        <FaPaperPlane className="w-5 h-5" />
      </button>
    </div>
  );
}
