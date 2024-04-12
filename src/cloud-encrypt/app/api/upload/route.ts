import formidable from "formidable";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  
  return NextResponse.json({ message: "Hehe"}, { status: 200 });
}

