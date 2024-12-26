import { Schema, model, models } from "mongoose";

// Define the structure of an EntryItem
type EntryItem = {
  title: string;
  info?: string;
  description?: string;
}

// Define the structure of a Section
export type Section = {
  title: string;
  items: string | EntryItem[]; // Mixed type: string or EntryItem
}

// // Define the schema for EntryItem
// const entryItemSchema = new Schema<EntryItem>({
//   title: { type: String, required: true },
//   info: { type: String, required: false },
//   description: { type: String, required: false },
// });

// Define the schema for Section
const sectionSchema = new Schema<Section>({
  title: { type: String, required: true },
  items: [
    {
      type: Schema.Types.Mixed, // Allow mixed types (string or EntryItem object)
      validate: {
        validator: function (item: string | EntryItem) {
          return (
            typeof item === "string" || // Allow strings
            (typeof item === "object" && item.title) // Validate EntryItem
          );
        },
        message: "Item must be a string or an object with a 'title'.",
      },
    },
  ],
});

// Define the model for the Section collection
const SectionModel = models["resumeentries"] || model<Section>("resumeentries", sectionSchema);

export default SectionModel;
