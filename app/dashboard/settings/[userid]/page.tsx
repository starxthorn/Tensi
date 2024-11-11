"use server";

import DashboardWrapperManager from "@/components/ReusableComponents/DashboardWrapperManager";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { CategoryType, CompanyType, UserType } from "@/lib/type";
import { BiSolidUserCircle } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCategories, fetchCompanies, fetchUserData } from "@/lib/action";
import UserSetup from "@/components/FormComponents/UserSetup";
import UserCategory from "@/components/FormComponents/UserCategory";
import UserCompany from "@/components/FormComponents/UserCompany";
import DeleteUserData from "@/components/FormComponents/DeleteUserData";

export default async function Page({ params }: { params: { userid: string } }) {
  const user = (await fetchUserData(params.userid)) as UserType;
  const categories = await fetchCategories(params.userid);
  const companies = await fetchCompanies(params.userid);

  return (
    <>
      <DashboardWrapperManager>
        <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <section
          className={`mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start`}
        >
          <div className="relative col-span-1 h-auto pb-20 flex flex-col justify-start p-4 rounded-lg bg-neutral-900 border">
            <div className="absolute right-5 top-5 flex items-center justify-center gap-3 text-center">
              {user?.verified === "verified" && (
                <>
                  <p className="border-green-600 text-xs border-2 bg-green-200 rounded-lg text-green-600 font-bold px-2 py-1">
                    verified
                  </p>
                </>
              )}
              {user?.verified === "pending" && (
                <>
                  <p className="border-yellow-600 text-xs border-2 bg-yellow-200 rounded-lg text-yellow-600 font-bold px-2 py-1">
                    pending
                  </p>
                </>
              )}
              {user?.verified === "not verified" && (
                <>
                  <p className="border-red-600 text-xs border-2 bg-red-200 rounded-lg text-red-600 font-bold px-2 py-1">
                    not verified
                  </p>
                </>
              )}
            </div>
            <div
              className={`mt-10 flex flex-col items-center justify-center w-full`}
            >
              <Image
                src={user?.avatar || "/avatar.jpeg"}
                width={150}
                height={150}
                alt="profile picture"
                className={`rounded-full`}
              />
              <h1 className="mt-6 capitalize text-white font-bold text-xl lg:text-2xl flex items-center justify-center gap-2">
                {user?.name || (
                  <Skeleton className="w-[6rem] h-6 rounded-full" />
                )}
                {user?.verified === "verified" ? (
                  <>
                    <MdVerified className="text-lg lg:text-xl text-neutral-500" />
                  </>
                ) : (
                  <> </>
                )}
              </h1>
              <p className="w-[24rem] mt-2 text-neutral-400 text-center">
                {user?.verified === "pending" ||
                user?.verified === "verified" ? (
                  user?.description || (
                    <Skeleton className="w-[8rem] h-6 rounded-full" />
                  )
                ) : (
                  <></>
                )}
              </p>
              {user?.verified !== "not verified" ? (
                <>
                  <div className="mt-8 flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <AiFillHome className="text-2xl lg:text-3xl text-neutral-500" />
                        <h1 className="mt-1 text-neutral-300 font-semibold">
                          Shop Name
                        </h1>
                      </div>
                      <h1>
                        {user?.ShopName || (
                          <Skeleton className="w-[6rem] h-6 rounded-full" />
                        )}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <BiSolidUserCircle className="text-2xl lg:text-3xl text-neutral-500" />
                        <h1 className="text-neutral-300 font-semibold">UID</h1>
                      </div>
                      <h1>
                        {user?._id || (
                          <Skeleton className="w-[6rem] h-6 rounded-full" />
                        )}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <MdEmail className="text-2xl lg:text-3xl text-neutral-500" />
                        <h1 className="text-neutral-300 font-semibold">
                          Email
                        </h1>
                      </div>
                      <h1>
                        {user?.email || (
                          <Skeleton className="w-[6rem] h-6 rounded-full" />
                        )}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <MdOutlinePhone className="text-2xl lg:text-3xl text-neutral-500" />
                        <h1 className="text-neutral-300 font-semibold">
                          Phone
                        </h1>
                      </div>
                      <h1>
                        {user?.phone || (
                          <Skeleton className="w-[6rem] h-6 rounded-full" />
                        )}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <IoLocationSharp className="text-2xl lg:text-3xl text-neutral-500" />
                        <h1 className="text-neutral-300 font-semibold">
                          Location
                        </h1>
                      </div>
                      <h1>
                        {user?.location || (
                          <Skeleton className="w-[6rem] h-6 rounded-full" />
                        )}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <FaAddressCard className="text-2xl lg:text-3xl text-neutral-500" />
                        <h1 className="text-neutral-300 font-semibold">CNIC</h1>
                      </div>
                      <h1>
                        {user?.cnic || (
                          <Skeleton className="w-[6rem] h-6 rounded-full" />
                        )}
                      </h1>
                    </div>
                  </div>
                </>
              ) : (
                <UserSetup user={user} />
              )}
            </div>
          </div>
          <div
            className={`col-span-2 flex flex-col h-auto items-start pt-6 justify-start p-4 rounded-lg bg-neutral-900 border`}
          >
            {user?.verified === "verified" || "pending" ? (
              <>
                <div className="grid grid-cols-1 w-full gap-2">
                  <UserCategory user={user} />
                  <div className="flex items-center justify-start gap-4 flex-wrap w-full">
                    {categories?.map((data: CategoryType) => {
                      return (
                        <>
                          <DeleteUserData
                            Api={"/category?categoryid"}
                            DataId={data._id}
                            DeleteComponent={
                              <div
                                key={data._id}
                                className="border capitalize cursor-pointer rounded-full px-4 py-2 text-white bg-neutral-800"
                              >
                                {data?.category}
                              </div>
                            }
                          />
                        </>
                      );
                    })}
                  </div>
                  <UserCompany user={user} />
                  <div className="flex mb-6 items-center justify-start gap-4 flex-wrap w-full">
                    {companies?.map((data: CompanyType) => {
                      return (
                        <>
                          <DeleteUserData
                            Api={"/company?companyid"}
                            DataId={data._id}
                            DeleteComponent={
                              <div
                                key={data._id}
                                className="border capitalize cursor-pointer rounded-full px-4 py-2 text-white bg-neutral-800"
                              >
                                {data?.company}
                              </div>
                            }
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </section>
      </DashboardWrapperManager>
    </>
  );
}
