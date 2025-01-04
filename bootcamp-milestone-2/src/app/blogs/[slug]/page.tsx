"use client";
import { useEffect, useState } from "react";
import Comment from "@/components/Comment";
import style from "./blogs.module.css";
import type { Blog } from "@/database/blogSchema";
import { useRouter } from "next/router";  // Use Next.js' `useRouter` hook

async function getBlog(slug: string): Promise<Blog | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL not defined!");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/api/Blogs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    return res.json();
  } catch (err: unknown) {
    console.log(`error: ${err}`);
    return null;
  }
}

async function postComment(slug: string, commentData: { user: string; comment: string; time: string }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Blogs/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      throw new Error("Failed to post comment");
    }

    return res.json();
  } catch (err: unknown) {
    console.error("Error submitting comment:", err);
    return null;
  }
}

export default function Blog() {
  const router = useRouter();  // Get access to the router
  const { slug } = router.query;  // Extract `slug` from the URL parameters
  const [blog, setBlog] = useState<Blog | null>(null);
  const [newComment, setNewComment] = useState({ user: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch blog data on mount
  useEffect(() => {
    if (slug) {  // Ensure `slug` is available before making the request
      console.log("Fetching blog with slug:", slug);
      getBlog(slug as string).then((blog) => {
        if (!blog) {
          console.log("Blog not found");
        } else {
          console.log("Blog found:", blog);
        }
        setBlog(blog);
      });
    }
  }, [slug]);

  // Handle form submission for new comments
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.user || !newComment.comment) {
      alert("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    const commentData = {
      ...newComment,
      time: new Date().toISOString(),
    };

    const response = await postComment(slug as string, commentData);

    if (response) {
      setNewComment({ user: "", comment: "" });
    }

    setIsSubmitting(false);
  };

  if (blog) {
    return (
      <main className={style.blogPage}>
        <h1 className={style.title}>{blog.title}</h1>
        <p className={style.date}>
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <img
          src={blog.image}
          alt={blog.imageAlt}
          className={style.blogImage}
        />
        <p className={style.description}>{blog.description}</p>

        {/* Render comments */}
        <section className={style.commentsSection}>
          <h2>Comments</h2>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          {/* Form to add a new comment */}
          <form onSubmit={handleSubmit} className={style.commentForm}>
            <h3>Add a Comment</h3>
            <input
              type="text"
              placeholder="Your name"
              value={newComment.user}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, user: e.target.value }))
              }
              required
              className={style.input}
            />
            <textarea
              placeholder="Your comment"
              value={newComment.comment}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, comment: e.target.value }))
              }
              required
              className={style.textarea}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={style.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={style.blogPage}>
      <h1>Blog Not Found</h1>
      <p>We couldn&apos;t find the blog you were looking for.</p>
    </main>
  );
}
