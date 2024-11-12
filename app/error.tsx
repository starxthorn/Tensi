"use client";
import Button from "@/components/ReusableComponents/Button";

// Error boundaries must be Client Components

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <div className="h-[30rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <body className="flex items-center justify-center flex-col w-full h-[100vh] gap-4">
        <h2 className="text-4xl font-bold">Something went wrong!</h2>
        <Button onClick={() => reset()} className="px-6">
          Try again
        </Button>
      </body>
    </html>
  );
}
