import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import LoginFile from "@/app/(controllers)/schemas/LoginFile";
import Folder from "@/app/(controllers)/schemas/Folder";

export const POST = async (req: NextRequest) => {
  try {
    dbConnection();
    const { name, folder, username, password, stickyNotes } = await req.json();
    if (!name || !folder) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Name and folder are required",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const checkPoint = await LoginFile.findOne({ name, folder });
    if (checkPoint) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Login already exists",
      });
    }

    const newLogin = await LoginFile.create({
      name,
      username,
      folder,
      password: hashedPassword,
      stickyNotes,
    });

    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: newLogin._id } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Login created successfully",
      ActuallData: newLogin,
      FileStoreIn: storeInFolder,
    });
  } catch (error) {
    console.error("❌ db ain't connected ", error);
    return NextResponse.json({ success: false, status: 401 });
  }
};
