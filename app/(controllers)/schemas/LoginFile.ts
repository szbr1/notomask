import { Document } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";

interface LoginFileProps extends Document {
    name: string;
    folder: Types.ObjectId;
    username?: string;
    password?: string;
    stickyNote?: string;
}


const LoginFileSchema = new Schema<LoginFileProps>({
    name: { type: String, required: true },
    folder: { type: Schema.Types.ObjectId, ref: "", required: true },
    username: { type: String },
    password: { type: String },
    stickyNote: { type: String },
});

let LoginFile: mongoose.Model<LoginFileProps>;

if (mongoose.models.loginfile) {
    LoginFile = mongoose.models.loginfile
} else {
    LoginFile = mongoose.model("loginfile", LoginFileSchema);
}

export default LoginFile;

