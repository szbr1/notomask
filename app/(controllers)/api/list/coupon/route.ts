import Coupon from "@/app/(controllers)/schemas/Coupon";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await dbConnection();
    const { id } = await params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return NextResponse.json({ message: "There is no coupon found" });
    }
    return NextResponse.json(
      { message: "successfully loaded", coupon },
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
