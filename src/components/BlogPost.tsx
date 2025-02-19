import { Blog } from "@/types/types";
import TagBadge from "./TagBadge";
import { useEffect, useState } from "react";
import Error from "@/components/Error";
import axios from "axios";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import LoadingIcon from "./Loadingicon";

interface BlogPostProps {
  blog: Blog;
  isLoading?: boolean;
  expanded?: boolean;
  bgColor?: string;
  isError?: boolean;
}

const BlogPost = ({
  blog,
  isLoading,
  isError,
  expanded,
  bgColor,
}: BlogPostProps) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (blog?.content) {
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
      }).use(markdownItFootnote);

      const processedContent = md.render(blog.content);

      setHtmlContent(processedContent);
    }
  }, [blog]);

  const removeBlog = async (_id: ObjectId | undefined) => {
    if (!_id) return;
    try {
      const response = await axios.delete(`/api/blogposts/${_id}`);
      if (response.status === 200) {
        alert("Blog post deleted successfully");
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      alert("Failed to delete blog post");
    }
  };

  if (isLoading) return <LoadingIcon />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 flex-wrap mb-5 bg-white/10 p-3 rounded-md">
        <p className="m-0 text-blue-200/50">Tags</p>
        <div className="flex gap-2 flex-wrap mb-2">
          {blog.tags.length === 0 && (
            <TagBadge
              tag="No tags selected"
              key={0}
              className="bg-blue-200/40 text-blue-200"
            />
          )}
          {blog.tags.map((tag, index) => (
            <TagBadge tag={tag} key={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <h1>{blog.title}</h1>
      </div>
      <div
        className={`relative overflow-hidden transition-all ${
          expanded ? "max-h-full" : "max-h-52"
        }`}
      >
        <div
          className="max-w-none relative"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        {!expanded && (
          <div
            className={`absolute bottom-0 left-0 w-full h-44 pointer-events-none`}
            style={{
              backgroundImage: `linear-gradient(to top, ${
                bgColor || "#171717"
              }, transparent)`,
            }}
          />
        )}
      </div>
      {!expanded && (
        <button
          className="hover:underline mt-2 underline"
          onClick={() => router.push(`/blogposts/${blog._id}`)}
        >
          Read More
        </button>
      )}
      <p>{blog.date ? new Date(blog.date).toDateString() : "Invalid Date"}</p>
    </div>
  );
};

export default BlogPost;
