import type { Comment } from "@/types/types";

interface CommentProps {
  comment: Comment;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="comment">
      <p>{comment.content}</p>
    </div>
  );
}
