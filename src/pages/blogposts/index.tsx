import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import Loadingicon from "@/components/Loadingicon";
import StickyHeader from "@/components/stickyheader";
import Error from "@/components/Error";
import { Blog, BlogWithLike } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { customStyles } from "@/styles/SelectStyle";
import { tagOptions } from "@/types/types";
import Select, { MultiValue } from "react-select";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface BlogPageProps {}

function BlogPage({}: BlogPageProps) {
  const [filter, setFilter] = useState<string>("");
  const { data: session, status } = useSession();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<BlogWithLike[]> => {
      const { data } = await axios.get(
        `/api/blogposts?tags=${filter}&userEmail=${session?.user?.email}`
      );

      return data.map((blog: BlogWithLike) => ({
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        date: new Date(blog.date),
        tags: blog.tags,
        likes: blog.likes,
        liked: blog.liked,
        dislikes: blog.dislikes,
      })) as BlogWithLike[];
    },
    queryKey: ["blogs", filter, session?.user?.email],
  });

  const handleFilterChange = (
    selectedOptions: MultiValue<{ value: string }>
  ) => {
    setFilter(selectedOptions.map((option) => option.value).join(","));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <Container nopadding>
        <Select
          styles={customStyles}
          isMulti
          name="tags"
          placeholder="Filter by tag(s)"
          options={tagOptions.map((opt) => ({ value: opt, label: opt }))}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) => {
            handleFilterChange(selectedOptions);
          }}
        />
      </Container>
      {isLoading ? (
        <Loadingicon center />
      ) : isError || !blogs ? (
        <Error size="lg" icon />
      ) : blogs.length === 0 ? (
        <div className="flex-1 flex flex-col gap-2 items-center justify-center">
          <Loadingicon />
          <p>No blogs found ...</p>
          <p>Try adjusting your filters</p>
        </div>
      ) : (
        <>
          {blogs.map((blog: BlogWithLike, index) => {
            console.log(blog);
            return (
              <Container bgColor={`${index % 2 !== 0 ? "bg-neutral-800" : ""}`}>
                <BlogPost
                  blog={blog}
                  key={index}
                  bgColor={`${index % 2 !== 0 ? "#262626" : ""}`}
                />
              </Container>
            );
          })}
        </>
      )}
    </div>
  );
}

export default BlogPage;
