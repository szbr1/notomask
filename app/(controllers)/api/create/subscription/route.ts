import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Subscription from "@/app/(controllers)/schemas/Subscription";
import Folder from "@/app/(controllers)/schemas/Folder";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const {
      name,
      folder,
      renewDate,
      totalCost,
      planDuration,
      stickyNotes,
      username,
      password,
      store,
      pins,
    } = await req.json();

    if (!name || !folder) {
      return NextResponse.json({
        success: false,
        message: "folder name is required",
        status: 400,
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = password
      ? await bcrypt.hash(password, salt)
      : undefined;

    const newSubscription = await Subscription.create({
      name,
      folder,
      renewDate,
      totalCost,
      planDuration,
      stickyNotes,
      username,
      password: hashedPassword,
      store,
      pins,
    });

    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: newSubscription._id } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Subscription Created Successfully",
      ActuallData: newSubscription,
      FileStoreIn: storeInFolder,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 501,
      message: "server is not working corretly",
    });
  }
};
