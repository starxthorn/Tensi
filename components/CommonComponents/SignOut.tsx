"use client";

import { signOut } from "next-auth/react";
import { TailwindButton } from "../ui/TailwindButton";

export default function SignOutButton() {
  return (
    <>
      <TailwindButton onClick={() => signOut()}>Sign Out</TailwindButton>
    </>
  );
}
