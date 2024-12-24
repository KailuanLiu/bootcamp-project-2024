import React from 'react';
import BlogPost from './BlogPost';

// BlogPost component
function BlogPost({ blogs }) {
    return (
        <div id="blog-container">
            {blogs.map((blog) => (
                <BlogPost key={blog.slug} blog={blog} />
            ))}
        </div>
    );
}

export default BlogPost;