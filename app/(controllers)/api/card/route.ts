import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Card from "../../schemas/Card";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnection();

    const {
      folder,
      name,
      cardNumber,
      cvv,
      exp,
      NameOnCard,
      stickyNotes,
      cardType,
    } = await req.json();

    if (!folder || !name) {
      return NextResponse.json({
        success: false,
        message: "folder name is required",
        status: 400,
      });
    }

    const NewCardCreated = await Card.create({
      name,
      folder,
      cardNumber,
      cvv,
      exp,
      NameOnCard,
      stickyNotes,
      cardType,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "New Card Created Successfully",
      Data: NewCardCreated,
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
