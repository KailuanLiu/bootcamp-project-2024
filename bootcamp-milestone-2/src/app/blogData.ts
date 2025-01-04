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
      title: "Blog1",
      date: "12/24/2024",
      description: "I finished my art 182 project3!",
      image: "/Project3.pdf",
      imageAlt: "project-3",
      slug: "blog-1",
   },
   {
      title: "Blog2",
      date: "12/25/2024",
      description: "It's Christmas! I ate some souffle pancakes",
      image: "/souffle_pancakes.jpg",
      imageAlt: "yummy souffle pancakes",
      slug: "blog-2"
   }
]