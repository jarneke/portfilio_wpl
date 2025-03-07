import Comment from "@/components/Comment";
import NewComment from "@/components/NewComment";
import type { Comment as TComment } from "@/types/types";
import { ObjectId } from "mongodb";

interface CommentSectionProps {
  blogId: ObjectId;
  comments: TComment[];
}

export default function CommentSection({
  comments,
  blogId,
}: CommentSectionProps) {
  return (
    <div className="flex flex-col gap-5 bg-neutral-800 p-5 rounded-md">
      <h2>Comments</h2>
      <button className="btn">Add a comment</button>
      <NewComment blogId={blogId} handleDismiss={() => {}} />
      {comments.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}
