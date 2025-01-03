import style from "./blogs.module.css";
import BlogPreview from "@/components/blogPreview";
import connectDB from "@/database/db";
import BlogModel, { Blog } from "@/database/blogSchema";
import Link from "next/link";

async function getBlogs() {
  await connectDB();

  try {
    const blogs = await BlogModel.find().sort({ date: -1 });
    return blogs;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs: Blog[] = await getBlogs();

  return (
    <main>
      <div className={style.about}>
        <div className={style.blogPreviews}>
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
                <BlogPreview
                  title={blog.title}
                  date={blog.date.toLocaleDateString()}
                  description={blog.description}
                  image={blog.image}
                  imageAlt={blog.imageAlt}
                  slug={blog.slug}
                />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}