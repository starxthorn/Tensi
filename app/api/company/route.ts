import { connectdb } from "@/lib/db";
import Company from "@/models/Company";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectdb();
  const userid = req.nextUrl.searchParams.get("userid");
  try {
    const ExistUser = await User.findById(userid);
    if (ExistUser) {
      const { company } = await req.json();
      const creating_company = await Company.create({
        company,
        user: ExistUser._id,
      });
      ExistUser.companies.push(creating_company);
      await ExistUser.save();
      return NextResponse.json(
        {
          message: "Company created",
          response: creating_company,
        },
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  await connectdb();
  const companyid = req.nextUrl.searchParams.get("companyid");
  try {
    await Company.findByIdAndDelete(companyid);
    return NextResponse.json(
      {
        message: "Company deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
