
import mongoose from "mongoose";

interface CouponProps extends mongoose.Document{
  name: string;
  folder: mongoose.Types.ObjectId,
  worth: string;
  coupon: string;
  website: string;
  expiry: Date;
  stickyNotes?: string;
}

const CouponSchema = new mongoose.Schema<CouponProps>({
    name: {type: String, required: true},
    folder: {type: mongoose.Schema.Types.ObjectId, ref: "folders"},
    coupon: {type: String , required: true},
    expiry: {type: Date},
    stickyNotes: {type: String},
    worth: {type: String},
    website: {type: String}

})


let Coupon: mongoose.Model<CouponProps>;

if(mongoose.models.coupon){
    Coupon = mongoose.models.Coupon
}else{
    Coupon = mongoose.model("Coupon", CouponSchema)
}


export default Coupon;

