import Address from "@/app/(controllers)/schemas/Address";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const address = await Address.findById(id);
    if (!address) {
      return NextResponse.json({ message: "There is no address found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", address },
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
