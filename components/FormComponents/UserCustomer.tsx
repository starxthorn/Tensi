"use client";

import React, { useState } from "react";
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
import { CustomerType, ProductType, UserType, WitnessesType } from "@/lib/type";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SimpleButton } from "../ui/button";
import { useRouter } from "next/navigation";

interface UserCustomerTypes {
  user: UserType | null;
  products: ProductType[] | null;
}

export default function UserCustomer({ user, products }: UserCustomerTypes) {
  const [loader, setLoader] = useState(false);
  const [witness, setWitness] = useState<WitnessesType | null>({});
  const [witnesses, setWitnesses] = useState<WitnessesType[]>([]);
  const [customer, setCustomer] = useState<CustomerType | null>({
    purchase: "installment",
    TimeLimit: 30,
    ProductQuantity: 1,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleWitnessInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWitness({
      ...witness,
      [e.target.name]: e.target.value,
    });
  };

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

  const creating_customer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (user?.verified === "verified") {
        if (products?.length && products.length >= 0) {
          if (customer?.product?.stock && customer.product.stock >= 1) {
            const productStock = customer?.product?.stock;
            if (productStock) {
              await fetch(`/api/product?productid=${customer.product?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  stock: customer?.ProductQuantity
                    ? productStock - customer.ProductQuantity
                    : productStock - 1,
                }),
              });
            }
            await fetch(`/api/twilio`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: customer.name,
                phone: customer.phone,
                product: customer?.product?.name,
                price: customer?.product?.price,
                shopName: user.ShopName,
                advance: customer.advance,
                MonthlyInstallment: customer.MonthlyInstallment,
                // More details needed
              }),
            });
            const res = await fetch(
              `/api/customer?userid=${user._id}&productid=${customer?.product?._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...customer,
                  status: "active",
                  paid:
                    Number(customer?.advance) +
                    Number(customer.FirstInstallment),
                }),
              }
            );
            const data = await res.json();
            if (res.ok) {
              toast.success(data.message);
              window.location.reload();
              router.back();
            } else {
              toast.error("Something wrong");
            }
          } else {
            toast.error("Product stock is zero");
            setLoader(false);
          }
        } else {
          toast.error("Please add any product");
          setLoader(false);
        }
      } else {
        toast.error("Please verify your account");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ResetForm = () => {
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={creating_customer}>
        <div>
          <h1 className="text-2xl font-bold">Create New Customer</h1>
          <p className="text-muted-foreground mt-2">
            Make changes to your profile here. Click save when you&apos;re done.
          </p>
        </div>
        <div className="pb-20">
          <div className="w-full flex items-center justify-end">
            <div className="flex gap-4 self-end justify-center">
              <Button onClick={ResetForm} className="px-6">
                <>Reset</>
              </Button>
              <Button btnType={loader ? "button" : "submit"} className="px-6">
                {loader ? (
                  <div className="flex items-center justify-center gap-2">
                    <MiniLoader />
                    <p className="text-neutral-400">Creating</p>
                  </div>
                ) : (
                  <>Create</>
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
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="phone" className="mb-2">
                Phone
              </Label>
              <Input
                name="phone"
                onChange={handleInput}
                min={11}
                id="phone"
                placeholder="+92"
                type="number"
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
                min={13}
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
                min={11}
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
              />
            </LabelInputContainer>
          </div>
          <hr className="mt-10" />
          <div className="mt-10">
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full flex items-center justify-end">
                  <Button className="py-3 w-full">Add Witnesses</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[60vw]">
                <div className="flex items-center justify-between gap-4 mt-4">
                  <LabelInputContainer className="mt-2">
                    <Label htmlFor="name" className="mb-2">
                      Witness Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      onChange={handleWitnessInput}
                      placeholder="John"
                      type="text"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mt-2">
                    <Label htmlFor="cnic" className="mb-2">
                      CNIC Number
                    </Label>
                    <Input
                      id="cnic"
                      name="cnic"
                      onChange={handleWitnessInput}
                      placeholder="34201-0891231-8"
                      type="number"
                      min={13}
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className={"mt-2"}>
                    <Label htmlFor="FatherName" className="mb-2">
                      Father Name
                    </Label>
                    <Input
                      id="FatherName"
                      name="FatherName"
                      onChange={handleWitnessInput}
                      placeholder="example"
                      type="text"
                    />
                  </LabelInputContainer>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <LabelInputContainer className={"mt-2"}>
                    <Label htmlFor="location" className="mb-2">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      onChange={handleWitnessInput}
                      placeholder="Default Pakistan"
                      type="text"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className={"mt-2"}>
                    <Label htmlFor="nearby" className="mb-2">
                      Nearby
                    </Label>
                    <Input
                      id="nearby"
                      name="nearby"
                      onChange={handleWitnessInput}
                      placeholder="Default Pakistan"
                      type="text"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className={"mt-2"}>
                    <Label htmlFor="phone" className="mb-2">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      onChange={handleWitnessInput}
                      placeholder="+92"
                      type="number"
                    />
                  </LabelInputContainer>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <LabelInputContainer className={"mt-2"}>
                    <Label htmlFor="work" className="mb-2">
                      Work/Job
                    </Label>
                    <Input
                      id="work"
                      name="work"
                      onChange={handleWitnessInput}
                      placeholder="worker"
                      type="text"
                    />
                  </LabelInputContainer>
                </div>
                <DialogFooter className="mt-8">
                  <Button
                    className="w-full"
                    btnType={loader ? "button" : "submit"}
                    onClick={() => {
                      if (witness) {
                        setWitnesses((prevWitnesses) => [
                          ...prevWitnesses,
                          witness,
                        ]);
                        toast.success("Witness added");
                      }
                    }}
                  >
                    {loader ? (
                      <>
                        <div className="flex items-center justify-center gap-4">
                          <MiniLoader />
                          <p className="text-neutral-400">Adding</p>
                        </div>
                      </>
                    ) : (
                      <>Add Witness</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div
            className={`w-full flex items-center justify-between gap-6 mt-6 ${
              witnesses?.length === 0 && "hidden"
            }`}
          >
            <Button onClick={() => setWitnesses([])} className="px-6 py-3">
              <>Reset Witnesses</>
            </Button>
            <Button
              onClick={() => {
                setCustomer({ ...customer, witnesses: witnesses });
                toast.success("All witneses are added");
              }}
              className="px-6 py-3"
            >
              <>Add All</>
            </Button>
          </div>
          <div className={`w-full flex flex-col gap-4 mt-6`}>
            {witnesses?.length && witnesses?.length >= 1 ? (
              witnesses?.map((data) => {
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
                    placeholder={"Select Purchase Type"}
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
              Product By Serial Number
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <SimpleButton
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-zinc-800 h-10"
                >
                  {value ? (
                    <div className="text-neutral-300 capitalize">
                      <span className="text-white mr-6">
                        {
                          products?.find(
                            (product) => product?.SerialNumber === value
                          )?.name
                        }
                      </span>
                      Model Number (
                      {
                        products?.find(
                          (product) => product?.SerialNumber === value
                        )?.ModelNumber
                      }
                      ) Serial Number (
                      {
                        products?.find(
                          (product) => product?.SerialNumber === value
                        )?.SerialNumber
                      }
                      ) Price (
                      {
                        products?.find(
                          (product) => product?.SerialNumber === value
                        )?.price
                      }
                      )
                    </div>
                  ) : (
                    "Select Product By Serial Number"
                  )}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </SimpleButton>
              </PopoverTrigger>
              <PopoverContent className="w-[91vw] p-0">
                <Command>
                  <CommandInput placeholder="Select Product" className="h-10" />
                  <CommandList>
                    <CommandEmpty>No product found.</CommandEmpty>
                    <CommandGroup>
                      {products?.map((product) => (
                        <CommandItem
                          className="capitalize"
                          key={product.SerialNumber}
                          value={product.SerialNumber}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setCustomer({
                              ...customer,
                              product: product,
                            });
                            setOpen(false);
                          }}
                        >
                          <div className="text-neutral-300 capitalize">
                            <span className="text-white mr-8">
                              {product?.name}
                            </span>
                            Model Number({product?.ModelNumber}) Serial Number(
                            {product?.SerialNumber}) Price({product?.price})
                          </div>
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === product.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </LabelInputContainer>
        </div>
      </form>
    </>
  );
}
