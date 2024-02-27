"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { Substance } from "@prisma/client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(250),
  type: z.string(),
  EVcode: z.string(),
  status: z.string(),
});

export const BasicDetailsForm: React.FC<{
  data: Substance | null;
  type: "new" | "edit";
}> = ({ data, type }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(type === "new" ? true : false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      type: data?.type || "",
      EVcode: data?.EVcode || "",
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
      await axios.post(`/api/substances`, values);
      router.push(`/substances`);
      toast.success("Substance created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    const substanceId = data?.id;
    if (!substanceId) return;

    try {
      await axios.put(`/api/substancesss/${substanceId}`, {
        values,
      });
      router.push(`/substances`);
      toast.success("Substance updated successfully");
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
                  <Input placeholder="Active Substance Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active Substance">
                        Active Substance
                      </SelectItem>
                      <SelectItem value="Inactive Substance">
                        Inactive Substance
                      </SelectItem>
                      <SelectItem value="Excipient">Excipient</SelectItem>
                      <SelectItem value="Colorant">Colorant</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="EVcode"
            disabled={!isEditing}
            render={({ field }) => (
              <FormItem>
                <FormLabel>EVcode</FormLabel>
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
