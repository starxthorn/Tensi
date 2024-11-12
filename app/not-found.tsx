import Button from "@/components/ReusableComponents/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="h-[30rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="flex items-center flex-col w-full h-[100vh] gap-4 justify-center">
        <h2 className="font-bold text-3xl">Not Found</h2>
        <p>There is no page in Tensi that you have searched</p>
        <Link href="/">
          <Button className="px-6">Return Home</Button>
        </Link>
      </div>
    </>
  );
}
