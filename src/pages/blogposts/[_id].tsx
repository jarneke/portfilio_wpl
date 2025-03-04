import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import Loadingicon from "@/components/Loadingicon";
import MenuItem from "@/components/MenuItem";
import StickyHeader from "@/components/stickyheader";
import { Blog, BlogWithLike } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa";
import Error from "@/components/Error";

interface BlogDetailProps {}

function BlogDetail({}: BlogDetailProps) {
  const router = useRouter();

  const { _id } = router.query;

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<BlogWithLike> => {
      const { data } = await axios.get(`/api/blogposts/${_id}`);
      return data as BlogWithLike;
    },
    queryKey: ["blogs", _id],
  });

  return (
    <>
      <StickyHeader />
      <Container nopadding>
        <button onClick={() => router.back()}>
          <FaChevronLeft className="inline-block mr-2" />
          Back
        </button>
      </Container>
      <Container className="flex flex-col gap-7">
        {isLoading ? (
          <Loadingicon />
        ) : isError || !blog ? (
          <Error size="lg" icon />
        ) : (
          <BlogPost blog={blog} isLoading={isLoading} expanded />
        )}
      </Container>
    </>
  );
}

export default BlogDetail;
