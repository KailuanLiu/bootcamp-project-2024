import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database/db';
import BlogModel from '@/database/blogSchema';
import Cors from "cors";

// const cors = Cors({
//     methods: ['GET', 'POST'],
//     origin: "http://localhost:3000",
// });

// function runCors(req: NextRequest) {
//     return new Promise((resolve, reject) => {
//         //mimic express-like request/response handling with dummy response
//         cors(req as any, {} as any, (err: any) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(null); // CORS success
//         });
//     });
// }

// Ensure the correct structure is followed
// GET request handler to fetch a blog by its slug
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        // Await the resolution of the `params` Promise to access the slug
        // await runCors(req);
        const resolvedParams = await params;
        const { slug } = resolvedParams; // Destructure slug after promise resolution

        console.log("called api hook", slug); // log the slug to verify the request

        await connectDB(); // Ensure the database is connected

        // find the blog with the given slug
        const blog = await BlogModel.findOne({ slug }).orFail();
        return NextResponse.json(blog); // return blog data in JSON form
    } catch (err) {
        console.error("Error finding blog:", err);  // log error in case
        // return 404 response if blog is not found
        return NextResponse.json("Blog not found.", { status: 404 });
    }
}

// POST request handler to add a comment to a blog
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        // Await the resolution of the `params` Promise to access the slug
        const resolvedParams = await params;
        const { slug } = resolvedParams; // Destructure slug after promise resolution

        console.log("POST request to add a comment");
        await connectDB(); // Ensure MongoDB is connected

        // parse the request body to get the comment data
        const body = await req.json(); // Parse the request body

        // destructure the comment data from the request body
        const { user, comment, time } = body;
        // validate that all required fields are provided and are in the correct format
        if (!user || !comment || !time) {
            return NextResponse.json({ error: "Invalid comment data" }, { status: 400 });
        }
        if (!comment || typeof comment !== 'string' || comment.trim() === '') {
            return NextResponse.json({ error: "comment is required, can't be empty" }, { status: 400 });
        }
        if (!time || isNaN(new Date(time).getTime())) {
            return NextResponse.json({ error: "invalid time format" }, { status: 400 });
        }

        // Construct the comment object, ensuring the time is a valid Date Object
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

        // if the blog is not found, return a 404 response
        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Comment added successfully", blog: updatedBlog });
    } catch (err) {
        console.error("Error adding comment:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
