import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import StickyHeader from "@/components/stickyheader";
import Container from "@/components/Container";
import BlogPostForm from "@/components/BlogPostForm";
import BlogPost from "@/components/BlogPost";
import { BlogWithLike, BlogWithLikeAndComments } from "@/types/types";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingIcon from "@/components/Loadingicon";

function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", session?.user],
    queryFn: async () => {
      const response = await fetch("/api/auth/is-admin");

      const data = await response.json();

      return data.isAdmin;
    },
  });

  useEffect(() => {
    console.log("isAdmin ", isAdmin);
    console.log("status ", status);

    if (
      status === "unauthenticated" ||
      (status === "authenticated" && isAdmin === false)
    ) {
      router.push("/");
    }
  }, [status, isAdmin]);

  const [formData, setFormData] = useState<BlogWithLikeAndComments>({
    title: "",
    content: "",
    date: new Date(),
    tags: [],
    likes: 0,
    dislikes: 0,
    liked: "none",
    comments: [],
  });

  const handleFormChange = (updated: BlogWithLikeAndComments) => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
    }).use(markdownItFootnote);

    setFormData((prev) => ({
      ...updated,
      content: md.render(updated.content),
      date: prev.date,
    }));
  };

  if (status === "unauthenticated" || status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <>
      <StickyHeader />
      <div className="flex flex-col justify-center xl:flex-row">
        <Container bgColor="w-full">
          <BlogPostForm onChange={handleFormChange} />
        </Container>
        <Container bgColor="bg-neutral-800 w-full">
          <h1>Preview:</h1>
          <BlogPost blog={formData} expanded />
        </Container>
      </div>
    </>
  );
}

export default Admin;
