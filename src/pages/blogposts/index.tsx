import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import Loadingicon from "@/components/Loadingicon";
import MenuItem from "@/components/MenuItem";
import StickyHeader from "@/components/stickyheader";
import Error from "@/components/Error";
import { Blog } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { customStyles } from "@/styles/SelectStyle";
import { tagOptions } from "@/types/types";
import Select, { MultiValue } from "react-select";
import { useEffect, useState } from "react";

interface BlogPageProps {}

function BlogPage({}: BlogPageProps) {
  const [filter, setFilter] = useState<string>("");

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<Blog[]> => {
      const { data } = await axios.get(`/api/blogposts?tags=${filter}`);

      return data.map((blog: Blog) => ({
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        date: new Date(blog.date),
        tags: blog.tags,
      })) as Blog[];
    },
    queryKey: ["blogs", filter],
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
        <Loadingicon />
      ) : isError ? (
        <Error />
      ) : !blogs ? (
        <div className="flex-1 flex flex-col gap-2 items-center justify-center">
          <p>No blogs found ...</p>
        </div>
      ) : (
        <>
          {blogs.map((blog: Blog, index) => (
            <Container bgColor={`${index % 2 !== 0 ? "bg-neutral-800" : ""}`}>
              <BlogPost
                blog={blog}
                key={index}
                bgColor={`${index % 2 !== 0 ? "#262626" : ""}`}
              />
            </Container>
          ))}
        </>
      )}
    </div>
  );
}

export default BlogPage;
