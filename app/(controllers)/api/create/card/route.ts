import Card from "@/app/(controllers)/schemas/Card";
import Folder from "@/app/(controllers)/schemas/Folder";
import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const {
      folder,
      name,
      cardNumber,
      cvv,
      exp,
      nameOnCard,
      stickyNotes,
      cardType,
    } = await req.json();

    if (!folder || !name) {
      return NextResponse.json({
        success: false,
        message: "folder name is required",
        status: 300,
      });
    }

    if(!cardNumber || !cvv){
      return NextResponse.json({
        success: false,
        message: "card number is required",
        status: 300,
      });
    }

    const NewCardCreated = await Card.create({
      name,
      folder,
      cardNumber,
      cvv,
      exp,
      nameOnCard,
      stickyNotes,
      cardType,
    });
    const storeInFolder = await Folder.findByIdAndUpdate(
      folder,
      { $push: { filesInside: {fileType: "Card" , fileId: NewCardCreated._id} } },
      { new: true }
    );
    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Card Created Successfully",
      ActuallData: NewCardCreated,
      FileStoreIn: storeInFolder,
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
