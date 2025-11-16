import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Coupon from "@/app/(controllers)/schemas/Coupon";
import Folder from "@/app/(controllers)/schemas/Folder";

export const POST = async (req: NextRequest) => {
  try {
    dbConnection();
    const { name, folder, worth, website, coupon, expiry, stickyNotes } =
      await req.json();
    if (!name) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Name and folder are required",
      });
    }
    if (!coupon) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Coupon is required",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedCoupon = await bcrypt.hash(coupon, salt);

    const newCoupon = await Coupon.create({
      name,
      coupon: hashedCoupon,
      folder,
      expiry,
      stickyNotes,
      worth,
      website,
    });

    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: newCoupon._id } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Coupon created successfully",
      ActuallFile: newCoupon,
      FolderInStored: storeInFolder,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 501,
      message: "server have some issue try later.",
    });
  }
};
