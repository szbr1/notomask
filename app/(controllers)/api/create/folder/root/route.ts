import Folder from "@/app/(controllers)/schemas/Folder";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const { folderName, AddInHome } = await req.json();

    if (!folderName) {
      return NextResponse.json({
        success: false,
        message: "folder name is required",
        status: 400,
      });
    }

    const NewFolderCreated = await Folder.create({
      AddInHome,
      folderName,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Folder Created Successfully",
      Data: NewFolderCreated,
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
