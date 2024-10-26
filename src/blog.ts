export type Blog = {
    title: string;
    date: string;
    description: string; 
    image: string; 
    imageAlt: string;
    slug: string;
};

type Person = {
    firstname: string;
    lastname: string;
    birthday: string;
}

const persons: Person[] = [
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

const blogs: Blog[] = [
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
export function renderBlogs(blogs: Blog[]): void {
    const blogContainer = document.getElementById('blog-container');
    if(!blogContainer) {
        console.error('Blog container not found');
        return;
    }

    // clear any existing content in the container 
    blogContainer.innerHTML = '';
    
    //iterate over blogs array and create HTML elements for each blog 
    blogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.classList.add('blog-post');

        //title 
        const title = document.createElement('h2');
        title.textContent = blog.title;
        blogElement.appendChild(title);

        //date
        const date = document.createElement('p');
        date.classList.add('blog-date');
        date.textContent = blog.date;
        blogElement.appendChild(date);

        //description 
        const description = document.createElement('p');
        description.textContent = blog.description;
        blogElement.appendChild(description);

        //image
        const image = document.createElement('img');
        image.src = blog.image;
        image.alt = blog.imageAlt;
        blogElement.appendChild(image);

        //append the blog post to the container 
        blogContainer.appendChild(blogElement);
    });
}

renderBlogs(blogs);