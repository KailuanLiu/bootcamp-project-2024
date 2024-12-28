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
      image: "/Users/kailuanliu/Downloads/art182/project4/Project3.pdf",
      imageAlt: "alt/path",
      slug: "blog-1",
   },
   {
      title: "Blog2",
      date: "12/25/2024",
      description: "It's Christmas! I ate some souffle pancakes",
      image: "/Users/kailuanliu/Downloads/souffle_pancakes.jpg",
      imageAlt: "alt/path",
      slug: "blog-2"
   }
]