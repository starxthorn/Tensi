"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { toast } from "sonner";

interface DeleteUserDataTypes {
  Api: string | undefined | null;
  DataId: string | undefined | null;
  DeleteComponent: React.ReactNode;
}

export default function DeleteUserData({
  Api,
  DataId,
  DeleteComponent,
}: DeleteUserDataTypes) {
  const DeleteData = async () => {
    try {
      const res = await fetch(`/api/${Api}=${DataId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Product deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{DeleteComponent}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={DeleteData}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
