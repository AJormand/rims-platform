"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";

import { ControlledVocabulary, Product2Substance } from "@prisma/client";

import { useQueryClient } from "@tanstack/react-query";

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
  productId: z.string(),
  substanceId: z.string(),
  quantity: z.string(),
  unit: z.string(),
});

export const ActiveSubstanceEditForm: React.FC<{
  data: Product2Substance | null;
}> = ({ data }) => {
  const router = useRouter();
  const { data: controlledVocabularies } = useFetchControlledVocabularies();
  const queryClient = useQueryClient();
  const [isFetching, setIsFetching] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: data?.productId || "",
      substanceId: data?.substanceId || "",
      quantity: data?.quantity || "",
      unit: data?.unit || "",
    },
  });

  useEffect(() => {
    //reseting the form so that data is loaded in the default values properly - at time of form load data may not be available
    form.reset();
  }, []);

  // Define a submit handler.
  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    const productId = data?.productId;
    if (!productId) return;

    try {
      setIsFetching(true);
      console.log(data);
      const response = await axios.put(
        `/api/products/${productId}/substances`,
        {
          values,
        }
      );
      toast.success("Substance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    } catch (error) {
      toast.error("Something went wrong");
    }
    setIsFetching(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitEdit)}
        className="space-y-8 p-4"
      >
        <div className="flex flex-row-reverse gap-1">
          <Button size="sm" type="submit" disabled={isFetching}>
            Save
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            disabled={isFetching}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            disabled={isFetching}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  {/* <Input placeholder="" {...field} /> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {controlledVocabularies?.map(
                        (cv: ControlledVocabulary) =>
                          cv.name == "units" && (
                            <SelectItem value={cv.value} key={cv.value}>
                              {cv.value}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>
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
