import Comment from "@/components/Comment";
import type { Comment as TComment } from "@/types/types";

interface CommentSectionProps {
  comments: TComment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="flex flex-col gap-5 bg-neutral-800 p-5 rounded-md">
      <h2>Comments</h2>
      <button className="btn">Add a comment</button>
      {comments.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}
