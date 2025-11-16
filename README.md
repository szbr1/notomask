import {NextRequest, NextResponse } from 'next/server';

export const GET = async(req:NextRequest, {params}: {params: Promise<{id: string}>})=>{
  try {
     const {id} = await params;
    return NextResponse.json({message: "server is not working"},{status:200})
} catch (error) {
    console.error("error----:",error)
    return NextResponse.json({message: "server is not working"},{status:500})
  }
}