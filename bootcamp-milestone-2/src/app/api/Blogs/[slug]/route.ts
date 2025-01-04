import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database/db';
import blogSchema from '@/database/blogSchema';
import BlogModel from '@/database/blogSchema';

// Ensure the correct structure is followed
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        // Await the resolution of the `params` Promise
        const resolvedParams = await params;
        const { slug } = resolvedParams; // Destructure slug after promise resolution

        console.log("called api hook", slug);

        await connectDB(); // Ensure the database is connected

        const blog = await BlogModel.findOne({ slug }).orFail();
        return NextResponse.json(blog);
    } catch (err) {
        console.error("Error finding blog:", err);
        return NextResponse.json("Blog not found.", { status: 404 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        // Await the resolution of the `params` Promise
        const resolvedParams = await params;
        const { slug } = resolvedParams; // Destructure slug after promise resolution

        console.log("POST request to add a comment");
        await connectDB(); // Ensure MongoDB is connected

        const body = await req.json(); // Parse the request body

        // Validate the body
        const { user, comment, time } = body;
        if (!user || !comment || !time) {
            return NextResponse.json({ error: "Invalid comment data" }, { status: 400 });
        }
        if (!comment || typeof comment !== 'string' || comment.trim() === '') {
            return NextResponse.json({ error: "comment is required, can't be empty" }, { status: 400 });
        }
        if (!time || isNaN(new Date(time).getTime())) {
            return NextResponse.json({ error: "invalid time format" }, { status: 400 });
        }

        // Construct the comment object
        const newComment = {
            user,
            comment,
            time: new Date(time), // Ensure time is a Date object
        };

        // Update the blog with the new comment
        const updatedBlog = await BlogModel.findOneAndUpdate(
            { slug },
            { $push: { comments: newComment } },
            { new: true, useFindAndModify: false } // Return the updated document
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Comment added successfully", blog: updatedBlog });
    } catch (err) {
        console.error("Error adding comment:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
