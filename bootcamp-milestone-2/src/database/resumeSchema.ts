import { Schema, model, models } from "mongoose";

// Define the structure of an EntryItem
type EntryItem = {
  title: string;
  info?: string;
  description?: string;
};

// Define the structure of a Section
export type Section = {
  title: string;
  items: (string | EntryItem)[]; // Array of strings or EntryItems
};

// Define the schema for Section
const sectionSchema = new Schema<Section>({
  title: { type: String, required: true },
  items: [
    {
      type: Schema.Types.Mixed, // Allow mixed types (string or EntryItem)
      validate: {
        validator: function (item: string | EntryItem) {
          // Validation to ensure the item is a string or a valid EntryItem object
          return (
            typeof item === "string" || // Allow strings
            (typeof item === "object" && typeof item.title === "string") // Ensure EntryItem has a title
          );
        },
        message: "Item must be a string or an object with a 'title'.",
      },
    },
  ],
});

// Define the model for the Section collection
const SectionModel = models["resumeEntries.Experience"] || model<Section>("resumeEntries.Experience", sectionSchema);

export default SectionModel;
