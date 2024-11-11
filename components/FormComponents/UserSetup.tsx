"use client";
import { UserType } from "@/lib/type";
import { useSession } from "next-auth/react";
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
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface UserSetupTypes {
  user: UserType | null;
}

export default function UserSetup({ user }: UserSetupTypes) {
  const [userEdit, setUserEdit] = useState<UserType | null>({});
  const [loader, setLoader] = useState(false);
  const session = useSession();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserEdit({
      ...userEdit,
      [name]: value,
    });
  };

  const setup_profile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    if (session?.data) {
      try {
        const res = await fetch(`/api/access-user?userid=${user?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userEdit, verified: "pending" }),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message);
          window.location.reload();
        } else {
          toast.error("There is something wrong");
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
      <div className="mt-4 w-[16rem]" key={user?._id}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="py-3">Setup Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[70vw]">
            <form onSubmit={setup_profile}>
              <DialogHeader>
                <DialogTitle>Setup your Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <LabelInputContainer className="mt-6">
                <Label htmlFor="phone">Business Name</Label>
                <Input
                  onChange={handleInput}
                  required
                  autoComplete="off"
                  name="ShopName"
                  placeholder="Steel works"
                  type="text"
                  className="mt-2"
                />
              </LabelInputContainer>
              <div className="grid grid-cols-2 gap-10 mt-2">
                <div>
                  <div className="flex items-center justify-center gap-4 mt-4 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="phone">Phone no</Label>
                      <Input
                        onChange={handleInput}
                        required
                        autoComplete="off"
                        name="phone"
                        placeholder="+92"
                        type="number"
                        className="mt-2"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="cnic">CNIC</Label>
                      <Input
                        onChange={handleInput}
                        required
                        autoComplete="off"
                        name="cnic"
                        placeholder="34201-0891231-8"
                        type="number"
                        className="mt-2"
                      />
                    </LabelInputContainer>
                  </div>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      onChange={handleInput}
                      required
                      autoComplete="off"
                      name="location"
                      placeholder="Default Punjab, Pakistan"
                      type="text"
                      className="mt-2"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      onChange={handleInput}
                      required
                      autoComplete="off"
                      name="description"
                      maxLength={60}
                      id="description"
                      placeholder="I am a business man"
                      type="text"
                      className="mt-2"
                    />
                  </LabelInputContainer>
                </div>
                <div>
                  <LabelInputContainer className="mt-4">
                    <Label htmlFor="cnic_picture" className="mb-2">
                      CNIC Picture
                    </Label>
                    {userEdit?.cnic_picture?.length &&
                    userEdit?.cnic_picture?.length > 0 ? (
                      <Image
                        src={userEdit?.cnic_picture ?? ""}
                        width={625}
                        height={374}
                        className="rounded-lg h-[223px] w-full"
                        alt="image"
                      />
                    ) : (
                      <>
                        <UploadDropzone
                          appearance={{
                            container:
                              "cursor-pointer h-[223px] w-full border bg-zinc-800",
                            uploadIcon: "hidden",
                            button:
                              "bg-gradient-to-br py-6 w-[9rem] border relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                          }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setUserEdit({
                              ...userEdit,
                              cnic_picture: res[0]?.url,
                            });
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      </>
                    )}
                  </LabelInputContainer>
                </div>
              </div>
              <DialogFooter className="mt-4">
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
      </div>
    </>
  );
}
