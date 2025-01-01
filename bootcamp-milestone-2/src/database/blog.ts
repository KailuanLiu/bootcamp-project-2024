// src/database/Blog.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define the schema for the Blog model
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Create the Blog model
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
