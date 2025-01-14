"use client";
import Comment from "@/components/Comment";
import style from "./blogs.module.css";
import type { Blog } from "@/database/blogSchema";

// expects params to be a promise
type Props = {
  params: Promise<{ slug: string }>;
};


// function to fetch a blog based on its slug from the API
async function getBlog(slug: string) {
  // const apiUrl = 'https://bootcamp-project-2024-q6r7.vercel.app';
  const apiUrl = 'http://localhost:3000/api/blogs/${slug}';
	try {
    // fetch blog data from server with the given slug
    const res = await fetch(`${apiUrl}/api/blogs/${slug}`, {
      // mode: 'no-cors',
			cache: "no-store",	// disable caching for this request to ensure fresh
      // method: "GET",
		});

    if (!res.ok) {
      console.log("Response Status:", res.status);
      // Log the raw response to inspect it
      const rawData = await res.text();  // Get the raw text before parsing to JSON
      console.log("Raw Response Data:", rawData);
      throw new Error("Failed to fetch blog");
      
    }
    return res.json();
  } catch (err: unknown) {
    console.error('Error: ${err}'); 
    return null; 
  }
}

    



// Function to handle posting a new comment to the server
async function postComment(slug: string, commentData: { user: string; comment: string; time: string }) {
  // const apiUrl = 'https://bootcamp-project-2024-q6r7.vercel.app';
  const apiUrl = 'http://localhost:3000/api/blogs/${slug}';
  try {
    console.log("posting comment")  // log that we're posting a comment
    const res = await fetch(`${apiUrl}/api/blogs/${slug}`, {
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

export default async function Blog({ params }: Props) {
  const { slug } = await params; // Unwrap params using `use()`

  const blog: Blog = await getBlog(slug);
  
  if (!blog) {
    return (
      <main className={style.blogPage}>
        <h1>Blog Not Found</h1>
        <p>We couldn't find the blog you were looking for.</p>
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

        </section>
      </main>
    );
  }
