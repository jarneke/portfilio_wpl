import { NextApiRequest, NextApiResponse } from "next";
import type { Comment, CommentWithLike, CommentLike } from "@/types/types";
import {
  connect,
  disconnect,
  commentCollection,
  commentLikeCollection,
} from "@/config/db";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      await connect();
      const { content, date, userEmail, blogId }: Comment = req.body;
      await commentCollection.insertOne({
        content,
        date,
        userEmail,
        blogId,
      });
      res.status(200).json({ message: "Comment saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while saving the comment" });
    } finally {
      await disconnect();
    }
    // Save the comment to the database
  } else if (req.method === "GET") {
    // Get all comments for a specific blog post
    try {
      await connect();
      if (!req.query.blogId) {
        throw new Error("No blogId provided");
      }
      const comments: Comment[] = await commentCollection
        .find({
          blogId: new ObjectId(req.query.blogId as string),
        })
        .toArray();
      const commentsWithLikes: CommentWithLike[] = await Promise.all(
        comments.map(async (comment) => {
          const commentLikes: CommentLike[] = await commentLikeCollection
            .find({ commentId: new ObjectId(comment._id) })
            .toArray();
          const likedByUser = commentLikes.filter(
            (like) => like.userEmail === (session?.user?.email as string)
          );
          let liked: "like" | "dislike" | "none" = "none";
          if (likedByUser.length > 0) {
            liked = likedByUser[0].state;
          }
          return {
            _id: comment._id,
            blogId: comment.blogId,
            userEmail: comment.userEmail,
            content: comment.content,
            date: comment.date,
            likes: commentLikes.filter((like) => like.state === "like").length,
            dislikes: commentLikes.filter((like) => like.state === "dislike")
              .length,
            liked: liked,
          };
        })
      );
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching comments" });
    } finally {
      await disconnect();
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
