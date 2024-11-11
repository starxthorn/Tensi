import { connectdb } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectdb();
  try {
    const { ShopName, name, email, password } = await req.json();
    const Existuser = await User.findOne({ email });
    if (Existuser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // const currentDate = new Date().toISOString().split("T")[0];
    const user = await User.create({
      ShopName,
      name,
      email,
      password: hashedPassword,
      verified: "not verified",
      createdAt: Date(),
    });
    return NextResponse.json(
      {
        message: "User created",
        response: user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
