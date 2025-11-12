import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";

interface folderProps extends Document {
  folderName: string;
  filesInside: [mongoose.Types.ObjectId];
  AddInHome: boolean;
}
const folderSchema = new Schema<folderProps>({
  folderName: { type: String, required: true },
  filesInside: [{ type: mongoose.Types.ObjectId }],
  AddInHome: { type: Boolean, default: false },
});

let Folder: mongoose.Model<folderProps>;

if (mongoose.models && mongoose.models.folders) {
  Folder = mongoose.models.folders;
} else {
  Folder = mongoose.model("folders", folderSchema);
}

export default Folder;
