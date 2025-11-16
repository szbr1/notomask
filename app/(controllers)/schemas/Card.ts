// models/Card.ts
import mongoose, { Schema, Document } from "mongoose";

export interface CardProps extends Document {
  folder: mongoose.Types.ObjectId;
  name: string;
  cardNumber: string;
  cvv: string;
  exp: string;
  nameOnCard: string;
  stickyNotes?: string;
  cardType?: "Visa" | "Master"
}

const CardSchema = new Schema<CardProps>(
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
    cardNumber: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    exp: {
      type: String,
    },
    nameOnCard: {
      type: String,
      trim: true,
    },
    cardType: {
        type: String,
        enum: ["Visa", "Master"]
    },
    stickyNotes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Card ||
  mongoose.model<CardProps>("Card", CardSchema);
