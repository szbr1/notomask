import IdentityCard from "@/app/(controllers)/schemas/IdentityCard";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const idcard = await IdentityCard.findById(id);
    if (!idcard) {
      return NextResponse.json({ message: "There is no idcard found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", idcard },
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
