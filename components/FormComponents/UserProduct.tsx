"use client";

import { CategoryType, CompanyType, ProductType, UserType } from "@/lib/type";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface UserProductTypes {
  user: UserType | null;
  categories: CategoryType[] | null;
  compaines: CompanyType[] | null;
}

export default function UserProduct({
  user,
  categories,
  compaines,
}: UserProductTypes) {
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState<ProductType | null>({
    category: categories?.[0]?.category,
    company: compaines?.[0]?.company,
  });

  const handleSelectCategory = (value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
    }));
  };

  const handleSelectCompany = (value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      company: value,
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const creating_products = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    if (user?.verified !== "verified") {
      toast.error("Please verify your account");
      setLoader(false);
    } else {
      if (categories && categories?.length <= 0) {
        toast.error("Please add any category");
        setLoader(false);
      } else {
        if (compaines && compaines?.length <= 0) {
          toast.error("Please add any company");
          setLoader(false);
        } else {
          try {
            const res = await fetch(`/api/product?userid=${user?._id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            });
            const data = await res.json();
            if (res.ok) {
              toast.success(data.message);
              window.location.reload();
            } else {
              toast.error("Something went wrong");
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoader(false);
          }
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center" key={user?._id}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-6">New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[50vw]">
            <form onSubmit={creating_products}>
              <DialogHeader>
                <DialogTitle>Create new Product</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-between gap-4 mt-4">
                <LabelInputContainer>
                  <Label htmlFor="name">Product name</Label>
                  <Input
                    required
                    autoComplete="off"
                    name="name"
                    onChange={handleInput}
                    id="name"
                    placeholder="Samsung"
                    type="text"
                    className="mt-2"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="stock">Product stock</Label>
                  <Input
                    required
                    autoComplete="off"
                    name="stock"
                    onChange={handleInput}
                    id="stock"
                    placeholder="0"
                    type="text"
                    className="mt-2"
                  />
                </LabelInputContainer>
              </div>
              <div className="flex items-center justify-between gap-4 mt-4">
                <LabelInputContainer>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    required
                    autoComplete="off"
                    name="price"
                    onChange={handleInput}
                    id="price"
                    placeholder="0"
                    type="number"
                    className="mt-2"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="category" className="mb-2">
                    Category
                  </Label>
                  <Select name="category" onValueChange={handleSelectCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-neutral-400"
                        placeholder="Select option"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        ?.map((data: CategoryType) => (
                          <SelectItem
                            value={data?.category || ""}
                            key={data._id}
                          >
                            {data?.category}
                          </SelectItem>
                        ))
                        .reverse()}
                    </SelectContent>
                  </Select>
                </LabelInputContainer>
              </div>
              <div className="flex items-center justify-between gap-4 mt-4">
                <LabelInputContainer>
                  <Label htmlFor="ModelNumber">Model</Label>
                  <Input
                    autoComplete="off"
                    name="ModelNumber"
                    onChange={handleInput}
                    id="ModelNumber"
                    placeholder="s24"
                    type="text"
                    className="mt-2"
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="company" className="mb-2">
                    Company
                  </Label>
                  <Select name="company" onValueChange={handleSelectCompany}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-neutral-400"
                        placeholder="Select option"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {compaines
                        ?.map((data: CompanyType) => (
                          <SelectItem
                            value={data?.company || ""}
                            key={data._id}
                          >
                            {data?.company}
                          </SelectItem>
                        ))
                        .reverse()}
                    </SelectContent>
                  </Select>
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mt-4">
                <Label htmlFor="SerialNumber">Serial Number</Label>
                <Input
                  autoComplete="off"
                  name="SerialNumber"
                  onChange={handleInput}
                  id="SerialNumber"
                  placeholder="0"
                  type="number"
                  className="mt-2"
                />
              </LabelInputContainer>
              <DialogFooter className="mt-8">
                <Button btnType={loader ? "button" : "submit"}>
                  {loader ? (
                    <div className="flex items-center justify-center gap-4">
                      <MiniLoader />
                      <p className="text-neutral-400">Creating</p>
                    </div>
                  ) : (
                    <>Create Product</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
