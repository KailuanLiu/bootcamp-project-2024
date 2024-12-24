import Link from 'next/link';

const posts = [
   { slug: 'blog-1', title: 'first blog'},
   { slug: 'blog-2', title: 'second blog'},
];

export default function BlogList() {
   return (
      <div>
         <h1>Blog Posts</h1>
         <ul>
            {posts.map((post) => (
               <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
               </li>
            ))}
         </ul>
      </div>
   );
}
