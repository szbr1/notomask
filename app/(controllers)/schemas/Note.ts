// models/Note.ts
import mongoose, { Schema, Document } from "mongoose";

export interface NoteProps extends Document {
  folder: mongoose.Types.ObjectId;
  name: string;
  note: string;
}

const NoteSchema = new Schema<NoteProps>(
  {
    folder: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Note ||
  mongoose.model<NoteProps>("Note", NoteSchema);
