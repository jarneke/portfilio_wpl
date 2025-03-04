import MainPageStartupHeader from "@/components/MainPageStartupHeader";
import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import { useQuery } from "@tanstack/react-query";
import { Blog, BlogWithLike } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import StickyHeader from "@/components/stickyheader";

export default function Home() {
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<BlogWithLike> => {
      const { data } = await axios.get("/api/blogposts/latest");

      return data as BlogWithLike;
    },
    queryKey: ["blog"],
  });

  return (
    <>
      <StickyHeader />
      <div className="overflow-x-hidden">
        <MainPageStartupHeader />
        <div className="flex flex-col xl:flex-row ">
          <Container
            bgColor="bg-neutral-800 w-full xl:w-1/3"
            className="flex flex-col"
          >
            <h1 className="mb-12">Welcome to my portfolio</h1>
            <p className="mb-12">On this website, you'll find:</p>
            <ul className="flex flex-col gap-10 list-none mb-12">
              <li className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="m-0">{"->  "}</p>
                  <Link href={"/blogposts"} className="underline">
                    Blog Page
                  </Link>
                </div>
                <p className="ms-7 m-0">
                  Regular updates on my projects, challenges and achievements
                  thoughout the internship
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="m-0">{"->  "}</p>
                  <Link href={"/about"} className="underline">
                    About Page
                  </Link>
                </div>
                <p className="ms-7 m-0">
                  Information about me, my internship and my role within 2commit
                </p>
              </li>
            </ul>
            <p className="m-0">
              Feel free to explore and learn more about my journey in
              application development with 2commit.
            </p>
          </Container>
          <Container className="flex flex-col gap-10" bgColor="w-full xl:w-2/3">
            <h1>Check out my latest blog!</h1>
            <BlogPost
              blog={blog!}
              isLoading={isLoading}
              isError={isError}
            ></BlogPost>
            <Link href={"/blogposts"} className="flex gap-2 items-center">
              <p className="underline mb-0">
                Check out the rest of my blog posts
              </p>
              <FaChevronRight className="w-4 h-4" />
            </Link>
          </Container>
        </div>
      </div>
    </>
  );
}
