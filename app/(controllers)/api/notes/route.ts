import { dbConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Note from "../../schemas/Note";


export const POST = async (req: NextRequest)=>{
   try {
    dbConnection()
    const {name, folder, note} = await req.json();
    if(!name || !folder ){
        return NextResponse.json({success: false, status: 400, message: "Name and folder are required"})
    }

    const newNote = await Note.create({
        name,
        folder,
        note,
    })
    return NextResponse.json({success: true, status: 200, message: "Login created successfully", data: newNote})
} catch (error) {
    console.error("server is not working corretly", error)
    return NextResponse.json({success: false, status: 401, message: "server is not working corretly"})
   }
}

