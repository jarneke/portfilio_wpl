import BlogPost from "@/components/BlogPost";
import { Blog } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BlogPageProps {}

const BlogPage = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<Blog[]> => {
      const { data } = await axios.get("/api/blogposts");

      return data.map((blog: any) => ({
        title: blog.title,
        content: blog.content,
        date: new Date(blog.date),
        tags: blog.tags,
      })) as Blog[];
    },
    queryKey: ["blogs"],
  });

  return (
    <>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error</p>
        ) : !blogs ? (
          <p>No blogs found</p>
        ) : (
          blogs.map((blog: Blog, index) => <BlogPost blog={blog} key={index} />)
        )}
      </div>
    </>
  );
};

export default BlogPage;
