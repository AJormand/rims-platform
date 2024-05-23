"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";
import { editRegistration } from "@/app/services/api-client/api-client";

import {
  Registration as RegistrationType,
  Product as ProductType,
  Application as ApplicationType,
} from "@prisma/client";

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

import { ControlledVocabulary } from "@prisma/client";
import Link from "next/link";

type ExtendedRegistrationType = RegistrationType & {
  product: ProductType;
  applicaiton: ApplicationType;
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(250),
  status: z.string(),
  country: z.string(),
  registrationNumber: z.string().max(100),
});

export const BasicDetailsForm: React.FC<{
  data: ExtendedRegistrationType | null;
  type: "new" | "edit";
}> & {
  Skeleton: React.FC<{}>;
} = ({ data, type }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: controlledVocabularies } = useFetchControlledVocabularies();
  const [isEditing, setIsEditing] = useState(type === "new" ? true : false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      status: data?.status || "Draft",
      country: data?.country || "",
      registrationNumber: data?.registrationNumber || "",
    },
  });

  useEffect(() => {
    //reseting the form so that data is loaded in the default values properly - at time of form load data may not be available
    form.reset();
  }, []);

  // Define a submit handler.
  const onSubmitNew = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/registrations`, values);
      router.push(`/registrations/${response.data.id}`);
      toast.success("Registration created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    const registrationId = data?.id;
    if (!registrationId) return;
    const response = await editRegistration(registrationId, values);
    if (response?.status === 200) {
      router.push(`/registrations/`);
      await queryClient.invalidateQueries({
        queryKey: ["registration"],
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
        className="space-y-8 p-4"
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
            disabled={true}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Active Substance_Dose form_Strength"
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
            disabled={true}
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
            name="registrationNumber"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
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
