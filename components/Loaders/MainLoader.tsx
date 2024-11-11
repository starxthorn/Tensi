"use server";

import { cn } from "@/lib/utils";

interface MainLoaderPropsType {
  className?: string;
}

export default async function MainLoader({ className }: MainLoaderPropsType) {
  return (
    <>
      <div
        className={cn(
          "bg-black w-full fixed inset-0 flex items-center justify-center z-50",
          className
        )}
      >
        <div
          className={`w-10 h-10 border-white animate-spin transition-all border-4 border-r-transparent rounded-full`}
        ></div>
      </div>
    </>
  );
}
