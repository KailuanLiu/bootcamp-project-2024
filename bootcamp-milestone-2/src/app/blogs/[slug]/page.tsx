"use client";
import Comment from "@/components/Comment";
import style from "@/app/globals.css";
import type { Blog } from "@/database/blogSchema";
import { use, useEffect, useState } from "react";

async function getBlog(slug: string): Promise<Blog | null> {
	try {
		// This fetches the blog from an api endpoint that would GET the blog
		const res = await fetch(`http://localhost:3000/api/Blogs/${slug}`, {
			cache: "no-store",	
		})
		// This checks that the GET request was successful
		if (!res.ok) {
			throw new Error("Failed to fetch blog");
		}

		return res.json();
	} catch (err: unknown) {
		console.log(`error: ${err}`);
		return null;
		// `` are a special way of allowing JS inside a string
		// Instead of "error: " + err, we can just do the above
		// it is simular to formated strings in python --> f"{err}"
	}
}

// Function to handle posting a new comment
async function postComment(slug: string, commentData: { user: string; comment: string; time: string }) {
  try {
    console.log("posting comment")
    const res = await fetch(`http://localhost:3000/api/Blogs/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      throw new Error("Failed to post comment");
    }

    return res.json();
  } 
  catch (err: unknown) {
    console.error("Error submitting comment:", err);
    return null;
  }
}

export default function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // Unwrap params using `use()`
  const [blog, setBlog] = useState<Blog | null>(null);
  const [newComment, setNewComment] = useState({ user: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch blog data on mount
  useEffect(() => {
    console.log("refreshing")
    getBlog(slug).then(setBlog);
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
      // time: new Date(),
      time: new Date().toISOString(),
    };

    const response = await postComment(slug, commentData);

    if (response) {
      // Add the new comment to the local state
      // setBlog((prev) =>
      //   prev
      //     ? {
      //         ...prev,
      //         comments: [...prev.comments, commentData],
      //       }
      //     : null
      // );

      // Clear the form
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
            <p>No comments yet. Be the first to comment!</p>
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