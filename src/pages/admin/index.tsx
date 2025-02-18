import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import StickyHeader from "@/components/stickyheader";
import MenuItem from "@/components/MenuItem";
import Link from "next/link";
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
    const markdownContent = updated.content;
    const tagsArray = updated.tags;

    // Initialize markdown-it with additional plugins
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
    }).use(markdownItFootnote);

    const processedContent = md.render(markdownContent);

    const blogPost: Blog = {
      title: updated.title,
      content: processedContent,
      tags: tagsArray,
      date: new Date(),
    };

    setFormData(blogPost);
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
