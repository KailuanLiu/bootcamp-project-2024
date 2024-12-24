import React from 'react';
import BlogPost from './BlogPost'; // Renamed to avoid conflict

// BlogList component
function BlogList({ blogs }) {
    return (
        <div id="blog-container">
            {blogs.map((blog) => (
                <BlogPost key={blog.slug} blog={blog} />
            ))}
        </div>
    );
}

export default BlogList;
