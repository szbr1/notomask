import Folder from "@/app/(controllers)/schemas/Folder";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }
    const result = await Folder.findById(id).populate("foldersInside").populate("filesInside.fileId");
    if(!result){
      return NextResponse.json(
        { message: "Folder not found" }, 
        { status: 404 }
      );
    }
    const data = { folders: result?.foldersInside, files: result?.filesInside };

    return NextResponse.json(
      { message: "successfully fetched", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error----:", error);
    return NextResponse.json(
      { message: "server is not working" },
      { status: 500 }
    );
  }
};
