import Folder from '@/app/(controllers)/schemas/Folder';
import { dbConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async()=>{
  try {
    await dbConnection();
    const folders = await Folder.find({AddInHome: true});
    if(!folders){
        return NextResponse.json({message: "Create New Folders"})
    }
    return NextResponse.json({message: "successfully fetched", folders},{status:200})
} catch (error) {
    console.error("error----:",error)
    return NextResponse.json({message: "server is not working"},{status:500})
  }
}