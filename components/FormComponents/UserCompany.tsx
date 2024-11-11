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
import { CompanyType, UserType } from "@/lib/type";

interface UserCompanyTypes {
  user: UserType | null;
}

export default function UserCompany({ user }: UserCompanyTypes) {
  const [company, setCompany] = useState<CompanyType | null>({});
  const [loader, setLoader] = useState(false);

  const create_company = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    if (user?.verified !== "verified") {
      toast.error("You are not verified");
      setLoader(false);
    } else {
      try {
        const res = await fetch(`/api/company?userid=${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(company),
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
        <h1 className="text-xl font-bold">Your Company</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-[10rem] py-3">New Company</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={create_company}>
              <DialogHeader>
                <DialogTitle>Create new Company</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when
                  you&apos;redone.
                </DialogDescription>
              </DialogHeader>
              <LabelInputContainer className="mb-4 mt-4">
                <Label htmlFor="category">Company</Label>
                <Input
                  // value={company?.company}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCompany({ company: e.target.value })
                  }
                  name="company"
                  id="company"
                  required
                  autoComplete="off"
                  placeholder="Samsung"
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
                    <>Create company</>
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
