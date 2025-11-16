import Folder from "@/app/(controllers)/schemas/Folder";
import IdentityCard from "@/app/(controllers)/schemas/IdentityCard";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const {
      folder,
      name,
      idCardNumber,
      expDate,
      fatherName,
      motherName,
      rDate,
    } = await req.json();

    if (!folder || !name) {
      return NextResponse.json({
        success: false,
        message: "folder and name are required.",
        status: 400,
      });
    }

    if (!idCardNumber) {
      return NextResponse.json({
        success: false,
        message: "id number is required.",
        status: 400,
      });
    }

    const NewIdCardCreated = await IdentityCard.create({
      name,
      folder,
      idCardNumber,
      expDate,
      rDate,
      fatherName,
      motherName,
    });
    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: NewIdCardCreated._id } },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Identity Card Created Successfully",
      ActuallFile: NewIdCardCreated,
      FileStoredIn: storeInFolder,
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
