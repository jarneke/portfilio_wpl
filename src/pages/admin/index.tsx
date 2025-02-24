import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import StickyHeader from "@/components/stickyheader";
import Container from "@/components/Container";
import BlogPostForm from "@/components/BlogPostForm";
import BlogPost from "@/components/BlogPost";
import { Blog } from "@/types/types";
import { useState } from "react";

function Admin() {
  const [formData, setFormData] = useState<Blog>({
    title: "",
    content: "",
    date: new Date(),
    tags: [],
  });

  const handleFormChange = (updated: Blog) => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
    }).use(markdownItFootnote);

    setFormData({
      ...updated,
      content: md.render(updated.content),
      date: new Date(),
    });
  };

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

// 🔒 Server-side authentication check
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
