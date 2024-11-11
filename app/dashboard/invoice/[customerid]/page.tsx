"use server";

import CustomerInvoice from "@/components/FormComponents/CustomerInvoice";
import { fetchSingleCustomer } from "@/lib/action";
import Link from "next/link";

interface PagePropsTypes {
  params: {
    customerid: string | null | undefined;
  };
}

export default async function Page({ params }: PagePropsTypes) {
  const customer = await fetchSingleCustomer(params.customerid);

  return (
    <>
      <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <section className="w-full flex items-start justify-center">
        <section className="py-8 w-[50vw] mt-10">
          <div id="customer-details">
            <h1 className="font-bold text-2xl">#CID: {params.customerid}</h1>
            <p className="mt-2 text-sm text-neutral-400">
              You can change your customer details here.{" "}
              <span>
                <Link
                  className="text-blue-400"
                  href={`/dashboard/users/edit-customer/${params.customerid}`}
                >
                  change
                </Link>
              </span>
            </p>
          </div>
          <CustomerInvoice customer={customer} />
        </section>
      </section>
    </>
  );
}
