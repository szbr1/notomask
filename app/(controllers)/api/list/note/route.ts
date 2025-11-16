import Note from "@/app/(controllers)/schemas/Note";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json({ message: "There is no note found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", note },
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
