import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import IdentityCard from "../../schemas/IdentityCard";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const { folder, name,idCardNumber, expDate, fatherName,motherName, rDate } = await req.json();

    if (!folder || !name) {
      return NextResponse.json({
        success: false,
        message: "folder and name are required.",
        status: 400,
      });
    }

    const NewIdCardCreated = await IdentityCard.create({
        name,
        folder,
        idCardNumber,
        expDate,
        rDate,
        fatherName,
        motherName,
    })

   return NextResponse.json({success: true, status: 200, message: "New Identity Card Created Successfully", Data: NewIdCardCreated})

  } catch (error) {
    console.error(error)
   return NextResponse.json({success: false, status:501, message: "server is not working corretly"})
  }
};
