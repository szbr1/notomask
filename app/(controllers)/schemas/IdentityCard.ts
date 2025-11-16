import mongoose, { Schema, Document } from "mongoose";

export interface IDCardProps extends Document {
  folder: mongoose.Types.ObjectId;
  name: string;
  idCardNumber: string;
  expDate: Date;
  fatherName: string;
  motherName: string;
  rDate: Date;
  stickyNotes: string;
}

const IDCardSchema = new Schema<IDCardProps>(
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
    idCardNumber: {
      type: String,
      required: true,
    },
    expDate: {
      type: Date,
    },
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
      trim: true,
    },
    rDate: {
      type: Date,
    },
    stickyNotes: {
      type: String
    }

  },
  { timestamps: true }
);

export default mongoose.models.IDCard ||
  mongoose.model<IDCardProps>("IDCard", IDCardSchema);
