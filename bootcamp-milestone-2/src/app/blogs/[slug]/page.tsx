"use client";
import Comment from "@/components/Comment";
import style from "./blogs.module.css";
import type { Blog } from "@/database/blogSchema";
import { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};


// function to fetch a blog based on its slug from the API
async function getBlog(slug: string) {
  // const apiUrl = 'https://bootcamp-project-2024-q6r7.vercel.app';
  const apiUrl = 'http://localhost:3000/api/Blogs/${slug}';
	try {
    // fetch blog data from server with the given slug
    const res = await fetch(`${apiUrl}/api/Blogs/${slug}`, {
      // mode: 'no-cors',
			cache: "no-store",	// disable caching for this request to ensure fresh
      // method: "GET",
		});

    console.log("Response Status:", res.status);
    // Log the raw response to inspect it
    const rawData = await res.text();  // Get the raw text before parsing to JSON
    console.log("Raw Response Data:", rawData);

		// This checks that the GET request was successful
		if (!res.ok) {
			throw new Error(`Failed to fetch blog. Status Code: ${res.status}`);
		}
		return res.json();  // return blog data in JSON format
	} catch (err: unknown) {
    // Log the error if something went wrong
    if (err instanceof Error) {
      console.log(`Error: ${err.message}`);
    } else {
      console.log("Unknown error:", err);
    }
		// console.log(`error: ${err}`); // log error to the console
		return null;  // return null if there was an error

	}
}

// Function to handle posting a new comment to the server
async function postComment(slug: string, commentData: { user: string; comment: string; time: string }) {
  // const apiUrl = 'https://bootcamp-project-2024-q6r7.vercel.app';
  const apiUrl = 'http://localhost:3000/api/Blogs/${slug}';
  try {
    console.log("posting comment")  // log that we're posting a comment
    const res = await fetch(`${apiUrl}/api/Blogs/${slug}`, {
      method: "POST", // POST method to send new comment data
      headers: { "Content-Type": "application/json" }, // specify JSON content type
      body: JSON.stringify(commentData),  // convert comment data to JSON and send it  as the request body
    });

    // check if response was successful
    if (!res.ok) {
      throw new Error("Failed to post comment"); // if not, throw new error 
    }

    // return the response data (updated blog)
    return res.json();
  } catch (err: unknown) {
    console.error("Error submitting comment:", err); // log any error during comment submission
    return null;  // return null if post request fails
  }
}

export default function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // Unwrap params using `use()`
  const [blog, setBlog] = useState<Blog | null>(null);  // use to store blog data
  const [newComment, setNewComment] = useState({ user: "", comment: "" }); // store new comment input
  const [isSubmitting, setIsSubmitting] = useState(false);  // state track submission status of comment 

  // Fetch blog data on mount
  useEffect(() => {
    console.log("fetching blog with slug:", slug);
    getBlog(slug).then((blog) => {
      console.log("Fetched blog data:", blog);
      if(!blog) {
        console.log("blog not found"); // log if no blog is found
      } else {
        console.log("blog found:", blog); // if blog is found
      }
      setBlog(blog);
    });
  }, [slug]);

  // Handle form submission for new comments
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();   // prevent default form submission behavior

    // validate that both user and comment fields are filled out
    if (!newComment.user || !newComment.comment) {
      alert("Please fill out all fields."); // aler user if any field is missing
      return;
    }

    setIsSubmitting(true);  // set submission state to true to disable the submit button

    // prepare the comment data, adding a timestamp in ISO format
    const commentData = {
      ...newComment,
      // time: new Date(),
      time: new Date().toISOString(),   // set time to current date and time
    };

    const response = await postComment(slug, commentData);  // send comment data to the server

    if (response) {
      setNewComment({ user: "", comment: "" }); // reset submission state
    }

    // if blog exists, render blog and its comments
    setIsSubmitting(false);
  };

  if (!blog) {
    return (
      <main className={style.blogPage}>
        <h1>Blog Not Found</h1>
        <p>We couldn&apos;t find the blog you were looking for.</p>
      </main>
    );
  } 
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
