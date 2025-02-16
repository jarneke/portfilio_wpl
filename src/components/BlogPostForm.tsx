import { Blog } from "@/types/types";
import axios from "axios";
import { useState } from "react";
import Select, { MultiValue } from "react-select";
import { remark } from "remark";
import remarkHtml from "remark-html";

interface BlogPostFormProps {
  onChange?: (data: Blog) => void;
}

const opts: string[] = [
  "new skill",
  "stuck on issue",
  "solving problems",
  "learning by doing",
  "real world experience",
  "first project",
  "debugging struggles",
  "mistake learned from",
  "time management",
  "working in a team",
  "adapting to challenges",
  "getting feedback",
  "gaining confidence",
  "workflow improvement",
  "mentorship experience",
];

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "none",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid #bedbff",
    boxShadow: "none",
    color: "#bedbff",
    "&:hover": {
      borderBottom: "2px solid #bedbff",
    },
  }),
  option: ({ data }: any) => ({
    backgroundColor: "#262626",
    margin: "0.5rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#171717",
  }),
  multiValue: (provided: any, { data }: any) => ({
    ...provided,
    borderRadius: "0.5rem",
    backgroundColor: "#171717",
  }),
  multiValueLabel: (provided: any, { data }: any) => ({
    ...provided,
    color: "#bedbff",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "white", // Remove button icon color
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.2)", // Darken on hover
    },
  }),
};

const BlogPostForm = ({ onChange }: BlogPostFormProps) => {
  const [formData, setFormData] = useState<Blog>({
    title: "",
    content: "",
    date: new Date(),
    tags: [],
  });
  const [message, setMessage] = useState<{
    state: "success" | "error" | "warning" | "none";
    message: string;
  }>({ state: "none", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated: Blog = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (onChange) onChange(updated);
  };

  const handleTagChange = (selectedOptions: MultiValue<{ value: string }>) => {
    const selectedTags = selectedOptions.map((option) => option.value);
    const updated: Blog = { ...formData, tags: selectedTags };
    setFormData(updated);
    if (onChange) onChange(updated);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blogPost: Blog = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
      date: new Date(),
    };

    try {
      const response = await axios.post("/api/blogposts", blogPost);
      if (response.status === 201) {
        setMessage({
          state: "success",
          message: "Blog post created successfully",
        });
      } else {
        setMessage({ state: "error", message: "Failed to create blog post" });
      }
    } catch (error) {
      setMessage({ state: "error", message: "Failed to create blog post" });
    }
  };

  return (
    <>
      <h1>Create a Blog Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e)}
          required
          placeholder="Title"
          className="bg-transparent border-b-2 border-blue-200 p-2 focus:outline-none focus:border-blue-500"
        />
        <textarea
          id="content"
          name="content"
          rows={10}
          cols={50}
          value={formData.content}
          onChange={(e) => handleChange(e)}
          required
          placeholder="Content (Markdown)"
          className="bg-transparent border-b-2 border-blue-200 p-2 focus:outline-none focus:border-blue-500 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
        />
        <br />
        <Select
          styles={customStyles}
          isMulti
          name="tags"
          placeholder="Select tags (multiple)"
          options={opts.map((opt) => ({ value: opt, label: opt }))}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) => {
            handleTagChange(selectedOptions);
          }}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
      {message.state !== "none" && (
        <p
          className={`text-${
            message.state === "success" ? "green" : "red"
          }-500`}
        >
          {message.message}
        </p>
      )}
    </>
  );
};

export default BlogPostForm;
