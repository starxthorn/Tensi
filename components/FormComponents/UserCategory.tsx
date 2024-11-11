"use client";

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
import Button from "../ReusableComponents/Button";
import LabelInputContainer from "../ui/LableInputContainer";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import MiniLoader from "../Loaders/MiniLoader";
import { CategoryType, UserType } from "@/lib/type";

interface UserCategoryTypes {
  user: UserType | null;
}

export default function UserCategory({ user }: UserCategoryTypes) {
  const [category, setCategory] = useState<CategoryType | null>({});
  const [loader, setLoader] = useState(false);

  const create_category = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    if (user?.verified !== "verified") {
      toast.error("You are not verified");
      setLoader(false);
    } else {
      try {
        const res = await fetch(`/api/category?userid=${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message);
          window.location.reload();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between" key={user?._id}>
        <h1 className="text-xl font-bold">Your Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-[10rem] py-3">New Category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={create_category}>
              <DialogHeader>
                <DialogTitle>Create new Category</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when
                  you&apos;redone.
                </DialogDescription>
              </DialogHeader>
              <LabelInputContainer className="mb-4 mt-4">
                <Label htmlFor="category">Category</Label>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCategory({ category: e.target.value })
                  }
                  name="category"
                  id="category"
                  required
                  autoComplete="off"
                  placeholder="Mobiles"
                  type="text"
                  className="mt-2"
                />
              </LabelInputContainer>
              <DialogFooter>
                <Button btnType={loader ? "button" : "submit"}>
                  {loader ? (
                    <>
                      <div className="flex items-center justify-center gap-4">
                        <MiniLoader />
                        <p className="text-neutral-400">Creating</p>
                      </div>
                    </>
                  ) : (
                    <>Create category</>
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
