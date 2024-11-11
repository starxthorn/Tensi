"use server";

import UserCustomer from "@/components/FormComponents/UserCustomer";
import DashboardWrapperManager from "@/components/ReusableComponents/DashboardWrapperManager";
import { fetchProducts, fetchUserData } from "@/lib/action";

interface PropsTypes {
  params: {
    userid: string;
  };
}

export default async function Page({ params }: PropsTypes) {
  const user = await fetchUserData(params.userid);
  const products = await fetchProducts(params.userid);
  return (
    <>
      <DashboardWrapperManager>
        <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <section>
          <UserCustomer user={user} products={products} />
        </section>
      </DashboardWrapperManager>
    </>
  );
}
