import { Blog } from "@/types/types";
import TagBadge from "./TagBadge";

interface BlogPostProps {
  blog: Blog | undefined;
  key?: number;
  isLoading?: boolean;
}

const BlogPost = ({ blog, key, isLoading }: BlogPostProps) => {
  if (!blog) {
    return <p>No blog found</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div key={key} className="flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap mb-5 bg-white/10 p-3 rounded-md">
        {blog.tags.map((tag, index) => (
          <TagBadge tag={tag} key={index} />
        ))}
      </div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{new Date(blog.date).toDateString()}</p>
    </div>
  );
};

export default BlogPost;
