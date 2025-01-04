import mongoose, { Schema, Document } from "mongoose";

// Define the IComment type
export type IComment = {
    _id: string;
    user: string;
    comment: string;
    time: Date;
};

// Define the Blog type
export type Blog = {
    title: string;
    date: Date;
    description: string;
    image: string;
    imageAlt: string;
    slug: string;
    // comments: IComment[];
};

// Create the blog schema
const blogSchema = new Schema<Blog>({
    title: { type: String, required: true },
    date: { type: Date, required: false, default: () => new Date() },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    // comments: [
    //     {
    //         user: { type: String, required: true },
    //         comment: { type: String, required: true },
    //         time: { type: Date, default: Date.now },
    //     },
    // ],
});

// Define the collection and model
const BlogModel = mongoose.models['blogs'] || mongoose.model('blogs', blogSchema);

export default BlogModel;
