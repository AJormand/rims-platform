"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { editApplication } from "@/app/services/api-client/api-client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { Application } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(250),
  country: z.string(),
  procedureType: z.string(),
  status: z.string(),
});

export const BasicDetailsForm: React.FC<{
  data: Application | null;
  type: "new" | "edit";
}> & {
  Skeleton: React.FC<{}>;
} = ({ data, type }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(type === "new" ? true : false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      country: data?.country || "",
      procedureType: data?.procedureType || "",
      status: data?.status || "draft",
    },
  });

  useEffect(() => {
    //reseting the form so that data is loaded in the default values properly - at time of form load data may not be available
    form.reset();
  }, []);

  // 2. Define a submit handler.
  const onSubmitNew = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/applications`, values);
      router.push(`/applications/${response.data.id}`);
      toast.success("Application created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    const applicationId = data?.id;
    if (!applicationId) return;
    const response = await editApplication(applicationId, values);
    if (response?.status === 200) {
      router.push(`/applications/`);
      await queryClient.invalidateQueries({
        queryKey: ["application"],
        refetchType: "active",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={
          type === "new"
            ? form.handleSubmit(onSubmitNew)
            : form.handleSubmit(onSubmitEdit)
        }
        className="space-y-8"
      >
        <div className="flex flex-row-reverse gap-1">
          <Button size="sm" type="submit" disabled={!isEditing}>
            Save
          </Button>
          <Button
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {!isEditing ? "Edit" : "Cancel"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Country_Procedure_Procedure number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="procedureType"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Procedure type</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

BasicDetailsForm.Skeleton = function skeletonBasicDetailsForm() {
  return (
    <div className="flex flex-col w-full h-72 border-gray-200 mb-16">
      {/* Status button component */}
      <div className="flex items-center gap-4 my-2 pb-2 border-b-2">
        <Skeleton className="h-6 w-60 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      {/* Section name */}
      <Skeleton className="h-8 w-48 rounded-sm" />
      {/* Section buttons */}
      <div className="flex w-full mt-10 flex-row-reverse">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-14 rounded-sm" />
          <Skeleton className="h-10 w-14 rounded-sm" />
        </div>
        <div></div>
      </div>
      {/* Section content */}
      <div className="flex gap-8 mt-8">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24 rounded-sm" />
            <Skeleton className="h-8 w-full rounded-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24 rounded-sm" />
            <Skeleton className="h-8 w-full rounded-sm" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24 rounded-sm" />
            <Skeleton className="h-8 w-full rounded-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-24 rounded-sm" />
            <Skeleton className="h-8 w-full rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
