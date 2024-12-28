import { NextApiRequest, NextApiResponse } from "next";
import Blog from "@/database/blogSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (req.method === "POST") {
    const { user, comment, time } = req.body;

    if (!user || !comment || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const blog = await Blog.findOneAndUpdate(
        { slug },
        { $push: { comments: { user, comment, time } } },
        { new: true }
      );

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      return res.status(200).json(blog);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
