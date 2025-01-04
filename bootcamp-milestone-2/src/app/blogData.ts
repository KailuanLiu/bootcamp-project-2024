export type Blog = {
   title: string;
   date: string;
   description: string;
   image: string;
   imageAlt: string;
   slug: string; //url name used to redirect to specific page
};

export const blogs: Blog[] = [
   {
      title: "blog1",
      date: "1/3/25",
      description: "firstblog - souffle pancakes",
      image: "/souffle_pancakes.jpg",
      imageAlt: "image of souffle pancakes",
      slug: "blog-1",
   },
   {
      title: "Blog2",
      date: "1-3-25",
      description: "art182 project 3",
      image: "/project3.pdf",
      imageAlt: "psd of project 3",
      slug: "blog-2"
   }
]

function appendBlogsToContainer(blogs: Blog[]) {
    const blogContainer = document.getElementById('blog-container');

    if (!blogContainer) {
        console.error('Blog container not found :(');
        return;
    }

    blogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');

        // make a title element with h1 styling and append it as a child
        const title = document.createElement('h1');
        title.textContent = blog.title;
        blogDiv.appendChild(title);

        // the same as the title element but with p styling
        const date = document.createElement('p');
        date.textContent = blog.date;
        blogDiv.appendChild(date);

        const description = document.createElement('p');
        description.textContent = blog.description;
        blogDiv.appendChild(description);

        const image = document.createElement('img');
        image.src = blog.image;
        image.alt = blog.imageAlt;
        blogDiv.appendChild(image);

        const readMoreLink = document.createElement('a');
        readMoreLink.href = `/blog/${blog.slug}`;
        readMoreLink.textContent = 'This is her instagram. Go follow her';
        blogDiv.appendChild(readMoreLink);

        // append this div for the blog with all the child elements to the blogContainer
        blogContainer.appendChild(blogDiv);
    });
}

appendBlogsToContainer(blogs);