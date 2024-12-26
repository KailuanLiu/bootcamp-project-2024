import { Schema, model, models } from "mongoose";

//define structure of an EntryItem
type EntryItem = {
    title: string;
    info?: string;
    description?: string;
}

//define structure of a section 
export type Section = {
    title: string;
    items: string | EntryItem[];
}

//define schema for Section 
const sectionSchema = new Schema<Section>({
    title: { type: String, required: true },
    items: [
        {
        type: Schema.Types.Mixed, // allow mixed types
        validate: {
            validator: function (item: string | EntryItem) {
                return (
                    typeof item === "string" || //allow string
                    (typeof item === "object" && item.title) //validate EntryItem
                );
            },
            message: "Item must be a string or an object with a 'title'.",
            },
        },
    ],
});

//define the model for the Section collection 
const SectionModel = models["resumeentries"] || model<Section>("resumeentries", sectionSchema);

export default SectionModel;