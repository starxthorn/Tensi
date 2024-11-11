"use server";

import EditUserCustomer from "@/components/FormComponents/EditUserCustomer";
import DashboardWrapperManager from "@/components/ReusableComponents/DashboardWrapperManager";
import { fetchSingleCustomer } from "@/lib/action";

interface PropsTypes {
  params: {
    customerid: string;
  };
}

export default async function Page({ params }: PropsTypes) {
  const singleCustomer = await fetchSingleCustomer(params.customerid);
  return (
    <>
      <DashboardWrapperManager>
        <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <section>
          <EditUserCustomer SingleCustomer={singleCustomer} />
        </section>
      </DashboardWrapperManager>
    </>
  );
}
