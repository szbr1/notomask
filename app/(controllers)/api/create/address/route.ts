import Address from "@/app/(controllers)/schemas/Address";
import Folder from "@/app/(controllers)/schemas/Folder";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const {
      city,
      country,
      district,
      name,
      folder,
      phone,
      closestLandmark,
      address,
      stickyNotes,
    } = await req.json();

    if (!name || !folder || !address) {
      return NextResponse.json({
        success: false,
        message: "folder & file name is required",
        status: 400,
      });
    }

    const NewAddressCreated = await Address.create({
      city,
      country,
      district,
      name,
      folder,
      phone,
      closestLandmark,
      address,
      stickyNotes,
    });

    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: NewAddressCreated._id } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Address Created Successfully",
      ActuallData: NewAddressCreated,
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
