import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const { phone, name, product, price, advance, ShopName, MonthlyInstallment } =
    await req.json();

  await client.messages.create({
    body: `Hey, ${name}! Today you have to pay PKR ${MonthlyInstallment} for the product as monthly installment that you have bought from ${ShopName}. Your product is ${product}. Product price is PKR ${price}. Your Advance is PKR ${advance}.`,
    from: "+12137252984", // From a valid Twilio number
    to: `+92${phone}`, // Text your number
  });

  return NextResponse.json(
    {
      message: "Message sent",
    },
    { status: 200 }
  );
}
