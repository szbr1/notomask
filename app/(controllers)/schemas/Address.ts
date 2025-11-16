import { Document } from "mongodb";
import mongoose,{ Schema, Types } from "mongoose";

interface addressPorps extends Document {
    city?: string
    country?: string
    district?: string
    name: string
    folder: Types.ObjectId
    phone?: number
    closestLandmark?: string
    address: string,
    stickyNotes: string
    
}
const addressSchema = new Schema<addressPorps>({
    city: {type: String},
    country:{type: String},
    district:{type: String},
    name:{type: String, required:true},
    folder: {type: mongoose.Schema.Types.ObjectId,},
    phone: {type: Number},
    closestLandmark:{type: String},
    address:{type: String, required:true},
    stickyNotes:{type: String}
    
}, {
    timestamps: true
});

let Address: mongoose.Model<addressPorps>
if(mongoose.models.Address){
   Address = mongoose.models.Address
}else{
   Address = mongoose.model("Address", addressSchema);
}

export default Address