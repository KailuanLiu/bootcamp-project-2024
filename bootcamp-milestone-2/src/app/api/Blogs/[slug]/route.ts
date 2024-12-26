import { NextRequest, NextResponse } from 'next/server'
import blogSchema from '@/database/blogSchema'
import BlogModel from '@/database/blogSchema';
import connectDB from '@/database/db'

// Ensure the correct structure is followed
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  console.log("called api hook");
  await connectDB(); // Ensure the database is connected

  const { slug } = params; // Destructur slug from params

  try {
    const blog = await blogSchema.findOne({ slug }).orFail();
    return NextResponse.json(blog);
  } catch (err) {
    console.error("Error finding blog:", err);
    return NextResponse.json("Blog not found.", { status: 404 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
    console.log("POST request to add a comment");
    await connectDB();

    const { slug } = params;
    const body = await req.json();

    try {
        //validate the body
        const { user, comment, time } = body;
        if (!user || !comment || !time) {
            return NextResponse.json({ error: "Invalid comment data" }, { status: 400 });
        }

        //construct comment object
        const newComment = {
            user, 
            comment, 
            time: new Date(time), // ensure time is a Date object
        };

        //update blog with new comment
        const updatedBlog = await BlogModel.findOneAndUpdate(
            { slug },
            { $push: { comments: newComment } },
            { new: true, useFindAndModify: false } // return updated document
        );

        if(!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Comment added successfully", blog: updatedBlog });
    } catch (err) {
        console.error("Error adding comment:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}