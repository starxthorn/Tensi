"use client";

import Link from "next/link";
import { useState } from "react";
import MainLoader from "../Loaders/MainLoader";

interface DashboardDataTypes {
  user: string;
  customers: number;
  products: number;
  categories: number;
  companies: number;
}

export default function DashboardData({
  customers,
  products,
  categories,
  companies,
  user,
}: DashboardDataTypes) {
  const [loader, setLoader] = useState(false);

  return loader ? (
    <MainLoader />
  ) : (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link
          onClick={() => setLoader(true)}
          href={`/dashboard/settings/${user}`}
          className="h-[9rem] bg-neutral-900 p-5 rounded-lg border-2 transition-all hover:scale-125 hover:shadow-black hover:border-2 hover:border-neutral-600 hover:shadow-2xl"
        >
          <h1 className="text-4xl mt-2 font-bold">{companies || 0}</h1>
          <h1 className="text-xl mt-2 text-neutral-300">Companies</h1>
        </Link>
        <Link
          onClick={() => setLoader(true)}
          href={`/dashboard/category/${user}`}
          className="h-[9rem] bg-neutral-900 p-5 rounded-lg border-2 transition-all hover:scale-125 hover:shadow-black hover:border-2 hover:border-neutral-600 hover:shadow-2xl"
        >
          <h1 className="text-4xl mt-2 font-bold">{products || 0}</h1>
          <h1 className="text-xl mt-2 text-neutral-300">Products</h1>
        </Link>
        <Link
          onClick={() => setLoader(true)}
          href={`/dashboard/users/${user}`}
          className="h-[9rem] bg-neutral-900 p-5 rounded-lg border-2 transition-all hover:scale-125 hover:shadow-black hover:border-2 hover:border-neutral-600 hover:shadow-2xl"
        >
          <h1 className="text-4xl mt-2 font-bold">{customers || 0}</h1>
          <h1 className="text-xl mt-2 text-neutral-300">Customers</h1>
        </Link>
        <Link
          onClick={() => setLoader(true)}
          href={`/dashboard/settings/${user}`}
          className="h-[9rem] bg-neutral-900 p-5 rounded-lg border-2 transition-all hover:scale-125 hover:shadow-black hover:border-2 hover:border-neutral-600 hover:shadow-2xl hover:mr-14"
        >
          <h1 className="text-4xl mt-2 font-bold">{categories || 0}</h1>
          <h1 className="text-xl mt-2 text-neutral-300">Categories</h1>
        </Link>
      </div>
    </>
  );
}
