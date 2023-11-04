"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { Product } from "@prisma/client";

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

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(250),
  category: z.string(),
  origin: z.string(),
  status: z.string(),
});

export const BasicDetailsForm: React.FC<{
  data: Product | null;
  type: "new" | "edit";
}> = ({ data, type }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(type === "new" ? true : false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      category: data?.category || "",
      origin: data?.origin || "",
      status: data?.status || "draft",
    },
  });

  // 2. Define a submit handler.
  const onSubmitNew = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/products`, values);
      router.push(`/products/${response.data.id}`);
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    const productId = data?.id;
    if (!productId) return;

    try {
      const response = await axios.put(`/api/products`, { productId, values });
      router.refresh();
      toast.success("Product created successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Something went wrong");
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
            name="category"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="origin"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origin</FormLabel>
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
