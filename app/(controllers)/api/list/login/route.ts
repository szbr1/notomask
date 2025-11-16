import LoginFile from "@/app/(controllers)/schemas/LoginFile";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const login = await LoginFile.findById(id);
    if (!login) {
      return NextResponse.json({ message: "There is no login found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", login },
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
