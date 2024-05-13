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

import { Registration as RegistrationType } from "@prisma/client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ControlledVocabulary } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(250),
  status: z.string(),
  country: z.string(),
});

export const BasicDetailsForm: React.FC<{
  data: RegistrationType | null;
  type: "new" | "edit";
}> = ({ data, type }) => {
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
            disabled={!isEditing}
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
        </div>
      </form>
    </Form>
  );
};
