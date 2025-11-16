import Folder from "@/app/(controllers)/schemas/Folder";
import { dbConnection } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();
    const { folderName, AddInHome, ParentId } = await req.json();
    console.log(folderName, ParentId, "----");

    if (!folderName || !ParentId) {
      return NextResponse.json(
        {
          message: "folder name & parend folder required required",
        },
        { status: 300 }
      );
    }

    const newFolderCreated = await Folder.create({
      folderName,
      AddInHome,
    });

    const parent = await Folder.findByIdAndUpdate(ParentId, {
      $addToSet: { foldersInside: newFolderCreated._id },
    });

    return NextResponse.json(
      {
        message: "sucessfully folder created",
        folder: newFolderCreated,
        parent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "server is not working" },
      { status: 500 }
    );
  }
};
