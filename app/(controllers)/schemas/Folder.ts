import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";

interface folderProps extends Document {
  folderName: string;
  filesInside: {
      fileType:
        | "Coupon"
        | "Address"
        | "IDCard"
        | "Note"
        | "Subscription"
        | "Card"
        | "Loginfile";
        fileId: mongoose.Types.ObjectId
    }[]
  foldersInside: mongoose.Types.ObjectId[];
  AddInHome: boolean;
}
const folderSchema = new Schema<folderProps>({
  folderName: { type: String, required: true },
  filesInside: [
    {
      fileType: {
        type: String,
        required: true,
        enum: ["Coupon", "Address", "IDCard", "Note", "Subscription", "Card", "Loginfile"],
      },
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "filesInside.fileType",
      },
    },
  ],
  foldersInside: [{ type: mongoose.Types.ObjectId, ref: "folders" }],
  AddInHome: { type: Boolean, default: false },
});

let Folder: mongoose.Model<folderProps>;

if (mongoose.models && mongoose.models.folders) {
  Folder = mongoose.models.folders;
} else {
  Folder = mongoose.model("folders", folderSchema);
}

export default Folder;
