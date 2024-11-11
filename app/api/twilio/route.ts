import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const { phone, name, product, price, advance, shopName, MonthlyInstallment } =
    await req.json();

  await client.messages.create({
    body: `Hey, ${name}! You have bought ${product} which cost ${price} rupees from ${shopName}. Your Advance is ${advance}. Your Monthly Installment is ${MonthlyInstallment}`,
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
