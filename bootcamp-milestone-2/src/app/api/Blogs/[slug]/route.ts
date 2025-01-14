import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database/db';
import BlogModel from '@/database/blogSchema';

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
export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const url = new URL(req.url);
        const slug = url.pathname.split('/')[3];   //extract slug from URL

        const blog = await BlogModel.findOne({ slug });

        if(!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog); // return blog data in JSON form
    } catch (err) {
        console.error("Error fetching comments:", err);  // log error in case
        // return 404 response if blog is not found
        return NextResponse.json({ error: "failed to fetch comments" },  { status: 404 });
    }
}

// POST request handler to add a comment to a blog
export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const url = new URL(req.url);
        const slug  = url.pathname.split('/')[3]; 

        const { user, comment } = await req.json();

        if (!user || !comment) {
            return NextResponse.json({ error: "User and comment are required" }, { status: 400 });
        }

        const blog = await BlogModel.findOne({ slug });

        if(!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 400 });
        }

        // Construct the comment object, ensuring the time is a valid Date Object
        const newComment = {
            user,
            comment,
            time: new Date(), // Ensure time is a Date object
        };

        blog.comments.push(newComment);

        await blog.save();

        return NextResponse.json({ comments: blog.comments }, { status: 200 });
    } catch (err) {
        console.error("Error saving comment:", err);
        return NextResponse.json({ error: "Comment unsaved" }, { status: 500 });
    }
}
