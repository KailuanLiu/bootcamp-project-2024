"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderBlogs = renderBlogs;
var persons = [
    {
        firstname: "Kai",
        lastname: "Cenat",
        birthday: "11-27-2005"
    },
    {
        firstname: "Gigi",
        lastname: "Huang",
        birthday: "10-19-2005",
    },
];
var blogs = [
    {
        title: "Blog1",
        date: "10-25-2024",
        description: "first blog post",
        image: "./image/blog1.png",
        imageAlt: "first blog image",
        slug: "first-blog"
    }
];
// renders blogs dynamically 
function renderBlogs(blogs) {
    var blogContainer = document.getElementById('blog-container');
    if (!blogContainer) {
        console.error('Blog container not found');
        return;
    }
    // clear any existing content in the container 
    blogContainer.innerHTML = '';
    //iterate over blogs array and create HTML elements for each blog 
    blogs.forEach(function (blog) {
        var blogElement = document.createElement('div');
        blogElement.classList.add('blog-post');

        // create and append title with a link to the blog's specific page
        const titleLink = document.createElement('a');
        titleLink.href = 'blogs/${blog.slug}.html'; // link to the specific blog page
        titleLink.textContent = blog.title;
        titleLink.classList.add('blog-title');

        //title 
        var title = document.createElement('h1');
        ttitleElement.appendChild(titleLink);
        blogPostDiv.appendChild(titleElement);

        //image
        var image = document.createElement('img');
        image.src = blog.image;
        image.alt = blog.imageAlt;
        blogElement.appendChild(image);

        //date
        var date = document.createElement('p');
        date.classList.add('blog-date');
        date.textContent = blog.date;
        blogElement.appendChild(date);

        //description 
        var description = document.createElement('p');
        description.textContent = blog.description;
        blogElement.appendChild(description);

        //append the blog post to the container 
        blogContainer.appendChild(blogElement);
    });
}
renderBlogs(blogs);

<script src="{blog.html}"></script>