"use client";

import { CategoryType, CompanyType, ProductType } from "@/lib/type";
import { useState } from "react";
import { toast } from "sonner";
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
import { fetchSingleProduct } from "@/lib/action";
import { FaEdit } from "react-icons/fa";

interface EditUserProductTypes {
  productid: string | null | undefined;
  compaines: CompanyType[] | null;
  categories: CategoryType[] | null;
}

export default function EditUserProduct({
  productid,
  categories,
  compaines,
}: EditUserProductTypes) {
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState<ProductType | null>({});

  const fetchProduct = async () => {
    const data = await fetchSingleProduct(productid);
    setProduct(data);
  };

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

  const updating_product = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await fetch(`/api/product?productid=${productid}`, {
        method: "PUT",
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
  };

  return (
    <>
      <Dialog key={productid}>
        <DialogTrigger asChild>
          <FaEdit
            onClick={fetchProduct}
            className="hover:text-white text-gray-500 transition-all text-lg cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[50vw]">
          <form onSubmit={updating_product}>
            <DialogHeader>
              <DialogTitle>Edit the Product</DialogTitle>
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
                  value={product?.name}
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
                  value={product?.stock}
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
                  value={product?.price}
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
                      placeholder={product?.category || "Select option"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      ?.map((data: CategoryType) => (
                        <SelectItem value={data?.category || ""} key={data._id}>
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
                  value={product?.ModelNumber}
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
                      placeholder={product?.company || "Select option"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {compaines
                      ?.map((data: CompanyType) => (
                        <SelectItem value={data?.company || ""} key={data._id}>
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
                value={product?.SerialNumber}
              />
            </LabelInputContainer>
            <DialogFooter className="mt-8">
              <Button btnType={loader ? "button" : "submit"}>
                {loader ? (
                  <>
                    <div className="flex items-center justify-center gap-4">
                      <MiniLoader />
                      <p className="text-neutral-400">Saving</p>
                    </div>
                  </>
                ) : (
                  <>Save Changes</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
