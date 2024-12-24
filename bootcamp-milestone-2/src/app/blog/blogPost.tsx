import React from 'react';

function BlogPost({ blog }) {
   return (
      <div className="blog-post">
         <h1>
            <a href={'blogs/${blog.slug}.html`} className="blog-title>
 	       {blog.title>
 	    </a>
   	 </h1>

	 {/* Image */}
	 <img src={blog.image} alt={blog.imageAlt} />
	
	 {/* Date */}
	 <p className="blog-date>{blog.date</p>

	 {/* Description */}
	 <p>{blog.description}</p>
      </div>
   );
}

export default BlogPost;
