"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "../ReusableComponents/Button";
import LabelInputContainer from "../ui/LableInputContainer";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import MiniLoader from "../Loaders/MiniLoader";
import { toast } from "sonner";
import { CustomerType } from "@/lib/type";
import { useRouter } from "next/navigation";

interface EditUserCustomerTypes {
  SingleCustomer?: CustomerType | null;
}

export default function EditUserCustomer({
  SingleCustomer,
}: EditUserCustomerTypes) {
  const [loader, setLoader] = useState(false);
  const [customer, setCustomer] = useState<CustomerType | null>({});
  const router = useRouter();

  useEffect(() => {
    if (SingleCustomer) setCustomer(SingleCustomer);
  }, [SingleCustomer]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectPurchase = (
    value: "installment" | "permanent purchase"
  ) => {
    setCustomer({
      ...customer,
      purchase: value,
    });
  };

  const handleSelectStatus = (value: "active" | "pending") => {
    setCustomer({
      ...customer,
      status: value,
    });
  };

  const updating_customer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await fetch(`/api/customer?customerid=${customer?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (res.ok) {
        toast.success("Customer updated");
        window.location.reload();
        router.back();
      }
      if (!res.ok) {
        toast.error("Something wrong");
        setLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={updating_customer}>
        <div>
          <h1 className="text-2xl font-bold">Edit your Customer</h1>
          <p className="text-muted-foreground mt-2">
            Make changes to your profile here. Click save when you&apos;re done.
          </p>
        </div>
        <div className="pb-20">
          <div className="w-full flex items-center justify-end">
            <div className="flex gap-4 self-end justify-center">
              <Button btnType={loader ? "button" : "submit"} className="px-6">
                {loader ? (
                  <div className="flex items-center justify-center gap-2">
                    <MiniLoader />
                    <p className="text-neutral-400">Saving</p>
                  </div>
                ) : (
                  <>Save</>
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mt-12">
            <LabelInputContainer>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Tyler"
                type="text"
                onChange={handleInput}
                value={customer?.name}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="phone" className="mb-2">
                Phone
              </Label>
              <Input
                name="phone"
                onChange={handleInput}
                id="phone"
                placeholder="+92"
                type="number"
                value={customer?.phone}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="cnic" className="mb-2">
                CNIC Number
              </Label>
              <Input
                id="cnic"
                name="cnic"
                onChange={handleInput}
                placeholder="34201-0891231-8"
                type="number"
                value={customer?.cnic}
              />
            </LabelInputContainer>
          </div>
          <div className="flex items-center justify-between gap-4 mt-6">
            <LabelInputContainer>
              <Label htmlFor="FatherName" className="mb-2">
                Father Name
              </Label>
              <Input
                id="FatherName"
                name="FatherName"
                onChange={handleInput}
                placeholder="John"
                type="text"
                value={customer?.FatherName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="work" className="mb-2">
                Work/Job
              </Label>
              <Input
                id="work"
                name="work"
                onChange={handleInput}
                placeholder="worker"
                type="text"
                value={customer?.work}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="religion" className="mb-2">
                Religion
              </Label>
              <Input
                id="religion"
                name="religion"
                onChange={handleInput}
                placeholder="Muslim or Christian"
                type="text"
                value={customer?.religion}
              />
            </LabelInputContainer>
          </div>
          <div className="flex items-center justify-between gap-4 mt-6">
            <LabelInputContainer>
              <Label htmlFor="MonthlyIncome" className="mb-2">
                Monthly Income
              </Label>
              <Input
                id="MonthlyIncome"
                name="MonthlyIncome"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.MonthlyIncome}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="OfficePhone" className="mb-2">
                Office Phone
              </Label>
              <Input
                id="OfficePhone"
                name="OfficePhone"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.OfficePhone}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="PhoneLocation" className="mb-2">
                Phone Location
              </Label>
              <Input
                id="PhoneLocation"
                name="PhoneLocation"
                onChange={handleInput}
                placeholder="Default Pakistan"
                type="text"
                value={customer?.PhoneLocation}
              />
            </LabelInputContainer>
          </div>
          <hr className="mt-10" />
          <div className={`w-full flex flex-col gap-4 mt-6`}>
            {customer?.witnesses?.length && customer?.witnesses?.length >= 1 ? (
              customer?.witnesses?.map((data) => {
                return (
                  <>
                    <div
                      className={
                        "w-full border bg-neutral-900 rounded-lg px-4 py-6"
                      }
                    >
                      <div className="flex items-center justify-between mt-2">
                        <h1>Name:</h1>
                        <h1 className="capitalize text-zinc-300">
                          {data.name}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <h1>Father Name:</h1>
                        <h1 className="text-zinc-300">{data.FatherName}</h1>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <h1>Phone:</h1>
                        <h1 className="text-zinc-300">{data.phone}</h1>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <h1>Work:</h1>
                        <h1 className="text-zinc-300">{data.work}</h1>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <hr className="mt-10" />
          <div className="flex items-center justify-between gap-4 mt-12">
            <LabelInputContainer>
              <Label htmlFor="IntialLocation" className="mb-2">
                Intial Location
              </Label>
              <Input
                id="IntialLocation"
                name="IntialLocation"
                onChange={handleInput}
                placeholder="Default Pakistan"
                type="text"
                value={customer?.IntialLocation}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="IntialNearby" className="mb-2">
                Intial Location Nearby
              </Label>
              <Input
                id="IntialNearby"
                name="IntialNearby"
                onChange={handleInput}
                placeholder="Default Pakistan"
                type="text"
                value={customer?.IntialNearby}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="LivingLocation" className="mb-2">
                Current Location
              </Label>
              <Input
                id="LivingLocation"
                name="LivingLocation"
                onChange={handleInput}
                placeholder="Default Pakistan"
                type="text"
                value={customer?.LivingLocation}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="LivingNearby" className="mb-2">
                Current Location Nearby
              </Label>
              <Input
                id="LivingNearby"
                name="LivingNearby"
                onChange={handleInput}
                placeholder="Default Pakistan"
                type="text"
                value={customer?.LivingNearby}
              />
            </LabelInputContainer>
          </div>
          <div className="flex items-center justify-between gap-4 mt-6">
            <LabelInputContainer>
              <Label htmlFor="DescriptionKnowledge" className="mb-2">
                Description Knowledge
              </Label>
              <Input
                id="DescriptionKnowledge"
                name="DescriptionKnowledge"
                onChange={handleInput}
                placeholder="Anything"
                type="text"
                value={customer?.DescriptionKnowledge}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="preacher" className="mb-2">
                Preacher
              </Label>
              <Input
                id="preacher"
                name="preacher"
                onChange={handleInput}
                placeholder="Tylor"
                type="text"
                value={customer?.preacher}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="product" className="mb-2">
                Purchase
              </Label>
              <Select name="purchase" onValueChange={handleSelectPurchase}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-neutral-400"
                    placeholder={customer?.purchase || "Select Purchase Type"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="installment">
                    Installment
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer"
                    value="permanent purchase"
                  >
                    Permanent Purchase
                  </SelectItem>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="status" className="mb-2">
                Status
              </Label>
              <Select name="status" onValueChange={handleSelectStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-neutral-400"
                    placeholder={customer?.status || "Set Customer Status"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="active">
                    active
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="pending">
                    pending
                  </SelectItem>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <LabelInputContainer>
              <Label htmlFor="MonthlyInstallment" className="mb-2">
                Monthly Installment
              </Label>
              <Input
                id="MonthlyInstallment"
                name="MonthlyInstallment"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.MonthlyInstallment}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="FirstInstallment" className="mb-2">
                First Installment
              </Label>
              <Input
                id="FirstInstallment"
                name="FirstInstallment"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.FirstInstallment}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="paid" className="mb-2">
                Paid
              </Label>
              <Input
                id="paid"
                name="paid"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.paid}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="TimeLimit" className="mb-2">
                Time Limit in Days
              </Label>
              <Input
                id="TimeLimit"
                name="TimeLimit"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.TimeLimit}
              />
            </LabelInputContainer>
          </div>
          <div className="flex items-center justify-between gap-4 mt-6">
            <LabelInputContainer>
              <Label htmlFor="advance" className="mb-2">
                Advance
              </Label>
              <Input
                id="advance"
                name="advance"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.advance}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="ProductQuantity" className="mb-2">
                Product Qty
              </Label>
              <Input
                id="ProductQuantity"
                name="ProductQuantity"
                onChange={handleInput}
                placeholder="0"
                type="number"
                value={customer?.ProductQuantity}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mt-6">
            <Label htmlFor="product" className="mb-2">
              Product
            </Label>
            <div className="flex items-start justify-start text-neutral-300">
              <div className="px-6 py-2 rounded-full bg-white/10 capitalize">
                <span className="text-white mr-6">
                  {customer?.product?.name}
                </span>
                Model Number(
                {customer?.product?.ModelNumber}) Serial Number(
                {customer?.product?.SerialNumber}) Price(
                {customer?.product?.price})
              </div>
            </div>
          </LabelInputContainer>
        </div>
      </form>
    </>
  );
}
