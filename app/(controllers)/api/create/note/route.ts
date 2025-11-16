import Folder from "@/app/(controllers)/schemas/Folder";
import Note from "@/app/(controllers)/schemas/Note";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    dbConnection();
    const { name, folder, note, stickyNotes } = await req.json();
    if (!name || !folder) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Name and folder are required",
      });
    }

    const newNote = await Note.create({
      name,
      folder,
      note,
      stickyNotes,
    });
    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: newNote._id } },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Login created successfully",
      ActualData: newNote,
      FileStoreIn: storeInFolder,
    });
  } catch (error) {
    console.error("server is not working corretly", error);
    return NextResponse.json({
      success: false,
      status: 401,
      message: "server is not working corretly",
    });
  }
};
