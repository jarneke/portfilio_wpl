import MainPageStartupHeader from "@/components/MainPageStartupHeader";
import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import StickyHeader from "@/components/stickyheader";
import MenuItem from "@/components/MenuItem";

export default function Home() {
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async (): Promise<Blog> => {
      const { data } = await axios.get("/api/blogposts/latest");

      return data as Blog;
    },
    queryKey: ["blog"],
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
      <MainPageStartupHeader />
      <Container bgColor="bg-neutral-800" className="flex flex-col gap-7">
        <h1>Welcome to my portfolio</h1>
        <p>
          During my internship at 2commit, a company specializing in custom code
          and low-code solutions, I am developing applications using Microsoft's
          Power Platform. This platform allows for the creation of business
          applications with minimal coding, but despite that, I have a strong
          passion for programming and enjoy writing code whenever possible.
        </p>
        <p>On this website, you'll find:</p>
        <ul className="flex flex-col gap-5">
          <li>
            {"->  "}
            <Link href={"/blogposts"} className="underline">
              Blog Page
            </Link>{" "}
            Regular updates on my projects, challenges and achievements
            thoughout the internship
          </li>
          <li>
            {"->  "}
            <Link href={"/about"} className="underline">
              About Page
            </Link>{" "}
            Information about me, my work and my role within 2commit
          </li>
        </ul>
        <p>
          Feel free to explore and learn more about my journey in application
          development with 2commit.
        </p>
      </Container>
      <Container className="flex flex-col gap-10">
        <h1>Check out my latest blog!</h1>
        <BlogPost blog={blog} isLoading={isLoading}></BlogPost>
        <Link href={"/blogposts"}>
          <div className="flex items-center gap-4">
            <p className="underline">Check out the rest of my blog posts</p>
            <FaChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </Container>
    </>
  );
}
