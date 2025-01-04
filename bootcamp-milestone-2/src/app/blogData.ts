export type Comment = {
   user: string;
   comment: string;
   date: Date;
}
export type Blog = {
	title: string;
	date: string;
	description: string;
    image: string;
    imageAlt: string;
    slug: string;  // A slug is a URL name used to redirect to a specific page 
};

export const blogs: Blog[] = [
   {
      title: "blog1",
      date: "1/3/25",
      description: "firstblog - souffle pancakes",
      image: "/souffle_pancakes.jpg",
      imageAlt: "image of souffle pancakes",
      slug: "blog-1",
      // comments: [
      //    { user: "bob", comment: "yum!", date: "1/3/25" }
      // ],
   },
   {
      title: "Blog2",
      date: "1/3/25",
      description: "art182 project 3",
      image: "/Project3.pdf",
      imageAlt: "psd of project 3",
      slug: "blog-2",
      // comments: [
      //    { user: "bob2", comment: "nice!", date: "1/3/25" }
      // ]
   }
]
