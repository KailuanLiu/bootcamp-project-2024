import { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/database/blogSchema";

//api handler for creating comments in a blog
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // extract the blog's slug from request query parameter
  const { slug } = req.query;

  //only allow post requests to create a comment
  if (req.method === "POST") {
    //destructure the user, comment, and time from the request body
    const { user, comment, time } = req.body;

    // check if any of the required fields (user, comment, time) are missing
    if (!user || !comment || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // attempts to find the blog by its slug and add the comment
      const blog = await Blog.findOneAndUpdate(
        { slug }, // search by slug from the request
        { $push: { comments: { user, comment, time } } }, // add new comment to blog
        { new: true } //return updated blog
      );

      //if no blog is found, return 404 error
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // if there are no errors, return blog with 200 ok status
      return res.status(200).json(blog);
    } catch (err) {
      // if there are errors during the operation, 500 server error
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // if method is not POST then 405 method not allwoed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
