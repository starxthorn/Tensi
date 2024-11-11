import { connectdb } from "@/lib/db";
import Company from "@/models/Company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectdb();
  const userid = req.nextUrl.searchParams.get("userid");
  try {
    const companies = await Company.find({ user: userid });
    return NextResponse.json(
      {
        response: companies,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
