import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Address from "../../schemas/Address";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const {
      city,
      country,
      district,
      name,
      folder,
      phone,
      closestLandmark,
      address,
    } = await req.json();

    if (!name || !folder || !address) {
      return NextResponse.json({
        success: false,
        message: "folder & file name is required",
        status: 400,
      });
    }

    const NewAddressCreated = await Address.create({
      city,
      country,
      district,
      name,
      folder,
      phone,
      closestLandmark,
      address,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Address Created Successfully",
      Data: NewAddressCreated,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 501,
      message: "server is not working corretly",
    });
  }
};
