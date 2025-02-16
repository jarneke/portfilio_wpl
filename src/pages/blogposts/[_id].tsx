import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import MenuItem from "@/components/MenuItem";
import StickyHeader from "@/components/stickyheader";
import { Blog } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";

interface BlogDetailProps {}

function BlogDetail({}: BlogDetailProps) {
  const router = useRouter();
  console.log("router query", router.query);

  const { _id } = router.query;

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<Blog> => {
      const { data } = await axios.get(`/api/blogposts/${_id}`);
      return data as Blog;
    },
    queryKey: ["blogs", _id],
  });

  return (
    <>
      <StickyHeader>
        <MenuItem>
          <Link href={"/"}>Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href={"/about"}>About</Link>
        </MenuItem>
        <MenuItem>
          <Link href={"/blogposts"}>Blogposts</Link>
        </MenuItem>
      </StickyHeader>
      <Container nopadding>
        <button onClick={() => router.back()}>
          <FaChevronLeft className="inline-block mr-2" />
          Back
        </button>
      </Container>
      <Container className="flex flex-col gap-7">
        <BlogPost blog={blog} isLoading={isLoading} expanded />
      </Container>
    </>
  );
}

export default BlogDetail;
