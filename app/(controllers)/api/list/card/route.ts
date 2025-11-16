import Card from "@/app/(controllers)/schemas/Card";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const card = await Card.findById(id);
    if (!card) {
      return NextResponse.json({ message: "There is no card found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", card },
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
