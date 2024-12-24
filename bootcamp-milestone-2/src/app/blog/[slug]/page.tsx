import React from 'react';

type Props = {
   params: { slug: string };
};

export default async function Blog({ params: { slug } }: Props) {
   //fetch the blog based on the slug
   const blog = await getBlog(slug);

   //handle if no blog is found 
   if (!blog) {
      return <div>Blog not found</div>;
   }

   return (
      <div>
         <h1>{blog.title}</h1>
         <p>{blog.content}</p>
      </div>
   );
}

//getBlog function fetches the blog data based on the slug
//if no blog is found, return "blog not found"
async function getBlog(slug: string) {
   try {
      const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
         cache: "no-store",
      });
      if (!res.ok) {
         throw new Error("Failed to fetch flog");
      }
      return res.json();
   } catch (err: unknown) {
      console.log(`error: ${err}`);
      return null;
   }
}