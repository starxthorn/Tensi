"use client";

import { CustomerType } from "@/lib/type";
import Button from "../ReusableComponents/Button";
import { useState } from "react";
import { IoPrintSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { Input } from "../ui/Input";
import { toast } from "sonner";
import { Label } from "../ui/Label";

interface CustomerInvoiceTypes {
  customer: CustomerType | null;
}

export default function CustomerInvoice({ customer }: CustomerInvoiceTypes) {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [customerDetails, setCustomerDetails] = useState<CustomerType | null>(
    {}
  );

  const updateCustomerKeys = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(false);
    const name = e.target.name;
    const value = e.target.value;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  //   function to create invoice number
  const createInvoice = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/customer?customerid=${customer?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerDetails),
      });
      if (res.ok) {
        toast.success("Invoice added");
        window.location.reload();
      }
      if (!res.ok) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(true);
      setLoading(false);
    }
  };

  //   function to print your customer invoice
  const printCustomerInvoice = () => {
    print();
  };

  return (
    <>
      <form
        id="print"
        className="flex gap-4 items-end justify-between mt-10"
        onSubmit={createInvoice}
      >
        <div className="flex items-end justify-center gap-4">
          <div>
            <Label htmlFor="invoice"># Invoice</Label>
            <Input
              onChange={updateCustomerKeys}
              name="invoice"
              placeholder="000000"
              type="number"
              id="invoice"
              required
              autoComplete="off"
              className="w-[14rem] mt-2"
            />
          </div>
          <div>
            <Label htmlFor="InvoiceDate">Invoice Date</Label>
            <Input
              onChange={updateCustomerKeys}
              name="InvoiceDate"
              placeholder="February 8, 2008"
              type="text"
              id="InvoiceDate"
              required
              autoComplete="off"
              className="w-[14rem] mt-2"
            />
          </div>
          <Button
            btnType="submit"
            className={`flex items-center cursor-pointer justify-center px-4 gap-2 ${
              disabled && "hidden"
            }`}
          >
            {!loading && <FaSave className="text-gray-300" />}
            {loading ? (
              <span className="text-neutral-500">Saving</span>
            ) : (
              <>Save</>
            )}
          </Button>
        </div>
        <Button
          onClick={printCustomerInvoice}
          className="flex cursor-pointer items-center justify-center px-4 gap-2"
        >
          <IoPrintSharp className="text-gray-300" />
          Print
        </Button>
      </form>
      <div className="mt-10" id="content">
        <div>
          <p id="note" className="text-white text-sm">
            <span className="text-yellow-400 font-bold">Note: &nbsp; </span>
            All installments must be payed on time. Transactions will not be
            conducted without a receipt
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Invoice: </h1>
            <p className="text-lg">{customer?.invoice ?? "Not found"}</p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Customer Id: </h1>
            <p className="text-lg">{customer?._id ?? "Not found"}</p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Invoice Date: </h1>
            <p className="text-lg capitalize">
              {customer?.InvoiceDate ?? "Not found"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Name: </h1>
            <p className="text-lg">{customer?.name ?? "Not found"}</p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Total: </h1>
            <p className="text-lg">
              PKR {customer?.product?.price?.toLocaleString() ?? "Not found"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Received: </h1>
            <p className="text-lg">
              PKR {customer?.FirstInstallment?.toLocaleString() ?? "Not found"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Remaining: </h1>
            <p className="text-lg">
              PKR{" "}
              {(
                customer?.paid &&
                customer.product?.price &&
                customer?.product?.price - customer?.paid
              )?.toLocaleString() ?? "Not found"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
