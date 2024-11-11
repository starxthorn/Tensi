"use server";

import { fetchSingleCustomer } from "@/lib/action";
import { months } from "@/lib/constant";
import { CustomerType } from "@/lib/type";

interface PropsTypes {
  params: {
    customerid: string | null;
  };
}

export default async function Page({ params }: PropsTypes) {
  const customer = (await fetchSingleCustomer(
    params.customerid
  )) as CustomerType;
  const currentMonth = new Date().getMonth();
  const currentDateMonth = months.filter((m) => m.number === currentMonth);

  const timelimit = Number(customer?.TimeLimit);
  const customerCreatedAt = new Date(customer.createdAt as Date);
  const customerDay = customerCreatedAt.getDate();

  const calculatedTargetDay = customerDay + timelimit;
  const totalDaysInCurrentMonth = Number(currentDateMonth[0]?.days) ?? 31;
  const adjustedTargetDay = Math.min(
    calculatedTargetDay,
    totalDaysInCurrentMonth
  );

  return (
    <>
      <section className="w-full h-full flex items-start justify-center">
        <div className="h-auto p-6 bg-white text-black my-10">
          <div>
            <h1 className="text-4xl font-bold">Powered By Tensi</h1>
          </div>
          <div className="mt-5">
            <h1 className="font-bold text-2xl">#CID: {customer?._id}</h1>
            <p className="text-sm text-neutral-500 font-semibold">
              You can change your customer details in editer mode
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Customer Name:</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer.name}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Phone:</h1>
                <h1 className="font-medium text-md ml-5">
                  +92{customer.phone}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Father Name:</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer.FatherName}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Work/Job:</h1>
                <h1 className="font-medium text-md ml-5">{customer.work}</h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Religion:</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.religion}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Monthly Income:</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.MonthlyIncome}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Office Phone:</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.OfficePhone}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Phone Location:</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.PhoneLocation}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Initial Living Location:</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.IntialLocation}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">
                  Initial Living Location Nearby:
                </h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.IntialNearby}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Current Living Location:</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.LivingLocation}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">
                  Current Living Location Nearby:
                </h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.LivingNearby}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Customer CNIC</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer?.cnic}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Customer Product</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer?.product?.name}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">
                  Customer Product Model Number
                </h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer?.product?.ModelNumber}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">
                  Customer Product Serial Number
                </h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer?.product?.SerialNumber}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Customer Product Price</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer?.product?.price}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Remaining Payment</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer.advance &&
                    customer.FirstInstallment &&
                    +customer.advance + +customer.FirstInstallment}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Installment Timelimit</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  {customer.TimeLimit}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Installment Date</h1>
                <h1 className="font-medium text-md ml-5 capitalize">
                  Day {adjustedTargetDay}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Customer Advance:</h1>
                <h1 className="font-medium text-md ml-5">{customer.advance}</h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="font-bold text-md">Monthly Installment</h1>
                <h1 className="font-medium text-md ml-5">
                  {customer.MonthlyInstallment}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {customer?.witnesses?.map((witness) => {
                return (
                  <>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">Wtiness Name</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.name}
                        </h1>
                      </div>
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">CNIC</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.cnic}
                        </h1>
                      </div>
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">Father Name</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.FatherName}
                        </h1>
                      </div>
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">Location Nearby</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.nearby}
                        </h1>
                      </div>
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">Location</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.location}
                        </h1>
                      </div>
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">Work</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.work}
                        </h1>
                      </div>
                      <div className="flex items-center justify-start">
                        <h1 className="font-bold text-md">Phone</h1>
                        <h1 className="font-medium text-md ml-5 capitalize">
                          {witness.phone}
                        </h1>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mt-10">
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Shopkeeper Sign</h1>
            </div>
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Customer Sign</h1>
            </div>
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Witness Sign</h1>
            </div>
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Witness Sign</h1>
            </div>
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Customer Thumb</h1>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mt-10">
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Witness Thumb</h1>
            </div>
            <div className="flex items-center justify-center text-center flex-col">
              <p>______________</p>
              <h1 className="text-md ml-5 font-medium mt-2">Witness Thumb</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
