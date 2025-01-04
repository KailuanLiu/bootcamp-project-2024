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
      slug: "blog-2",

   }
]
