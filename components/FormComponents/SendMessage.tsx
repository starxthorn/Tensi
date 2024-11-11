"use client";

import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";
import MiniLoader from "../Loaders/MiniLoader";

interface SendMessageTypes {
  name: string;
  price: number;
  product: string;
  phone: number;
  advance: number;
  ShopName: string;
  MonthlyInstallment: number;
}

export default function SendMessage({
  name,
  price,
  advance,
  product,
  ShopName,
  phone,
  MonthlyInstallment,
}: SendMessageTypes) {
  const [send, setsend] = useState(false);
  const [message, setMessage] = useState("");

  const SendAlertMessage = async () => {
    setsend(true);
    try {
      const res = await fetch(`/api/alert-twilio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          advance: advance,
          product: product,
          ShopName: ShopName,
          phone: phone,
          MonthlyInstallment: MonthlyInstallment,
        }),
      });
      if (res.ok) {
        toast.success("Message Sent");
        setMessage("Sent");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setsend(false);
    }
  };

  return (
    <>
      <div>
        {send ? (
          <MiniLoader />
        ) : (
          message || (
            <IoSend
              onClick={SendAlertMessage}
              className={`hover:text-white text-gray-500 transition-all text-lg cursor-pointer`}
            />
          )
        )}
      </div>
    </>
  );
}
