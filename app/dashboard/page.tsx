"use server";

import DashboardWrapperManager from "@/components/ReusableComponents/DashboardWrapperManager";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ReusableComponents/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spotlight } from "@/components/ui/spotlight";
import { getServerSession } from "next-auth";
import {
  fetchCategories,
  fetchCustomers,
  fetchProducts,
  fetchUserData,
} from "@/lib/action";
import { CustomerType, ProductType } from "@/lib/type";
import SignOutButton from "@/components/CommonComponents/SignOut";
import { authOptions } from "@/lib/auth";
import DashboardData from "@/components/CommonComponents/DashboardData";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const categories = await fetchCategories(session?.user._id);
  const customers = await fetchCustomers(session?.user._id);
  const products = await fetchProducts(session?.user._id);
  const user = await fetchUserData(session?.user._id);
  const companies = await fetchCategories(session?.user._id);

  return (
    <DashboardWrapperManager>
      <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div>
        <Spotlight
          className="h-[80vh] lg:w-[50vw] top-10 left-[80%] lg:block hidden -z-10"
          fill="white"
        />
        <Spotlight
          className="lg:left-[50%] left-0 opacity-0 top-20 h-[80vh] md:w-[20vw] lg:w-[60vw] -z-10"
          fill="white"
        />
        <Spotlight
          className="lg:left-[20%] left-0 opacity-0 top-20 h-[80vh] md:w-[20vw] lg:w-[60vw] -z-10"
          fill="white"
        />
      </div>
      <section className="w-full h-full">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-2xl font-bold capitalize">
            Hey, <span className="text-rose-500">{user?.name}</span>
          </h1>
          <SignOutButton />
        </div>
        <DashboardData
          categories={categories?.length ?? 0}
          companies={companies?.length ?? 0}
          customers={customers?.length ?? 0}
          user={user?._id ?? ""}
          products={products?.length ?? 0}
        />
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 gap-6 mt-10 pb-10">
          <div
            className={`${
              customers?.length === 0 && "bg-neutral-950 border"
            } h-[60vh]`}
          >
            {customers && customers.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <h1 className="text-2xl font-bold">
                    You have not added any customer
                  </h1>
                  <Link href={`/dashboard/create-customer/${user?._id}`}>
                    <Button className="w-40 mt-4">Add Customer</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 px-0">
                  <h1 className="text-2xl font-bold">Recent Customers</h1>
                  <Link href={`/dashboard/users/${user?._id}`}>
                    <p className="text-blue-500 flex items-center justify-center gap-1 mr-5">
                      see all <FaArrowRight className="text-blue-500" />
                    </p>
                  </Link>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers &&
                      customers
                        .map((data: CustomerType) => (
                          <TableRow key={data._id}>
                            <TableCell>{data._id}</TableCell>
                            <TableCell className="capitalize">
                              {data.name}
                            </TableCell>
                            <TableCell>{data.phone}</TableCell>
                          </TableRow>
                        ))
                        .reverse()
                        .slice(0, 6)}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
          <div
            className={`${
              products?.length === 0 && "bg-neutral-950 border"
            } h-[60vh]`}
          >
            {products && products.length === 0 ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <h1 className="text-2xl font-bold">
                    You have not added any product
                  </h1>
                  <Link href={`/dashboard/category/${user?._id}`}>
                    <Button className="w-40 mt-4">Add Product</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 px-0">
                  <h1 className="text-2xl font-bold">Recent Products</h1>
                  <Link href={`/dashboard/category/${user?._id}`}>
                    <p className="text-blue-500 flex items-center justify-center gap-1 mr-5">
                      see all <FaArrowRight className="text-blue-500" />
                    </p>
                  </Link>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products &&
                      products
                        .map((data: ProductType) => (
                          <TableRow key={data._id}>
                            <TableCell>{data._id}</TableCell>
                            <TableCell className="capitalize">
                              {data.name}
                            </TableCell>
                            <TableCell>{data.price}</TableCell>
                          </TableRow>
                        ))
                        .reverse()
                        .slice(0, 6)}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardWrapperManager>
  );
}
