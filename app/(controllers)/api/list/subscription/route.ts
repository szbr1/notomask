import Subscription from "@/app/(controllers)/schemas/Subscription";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return NextResponse.json({ message: "There is no subscription found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", subscription },
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
