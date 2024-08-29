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
import { editSubstance } from "@/app/services/api-client/api-client";

export const BasicDetailsForm: React.FC<{
  data: Substance | null;
  type: "new" | "edit";
  customObjectName: string;
}> = ({ data, type, customObjectName }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(type === "new" ? true : false);
  const [formSchema, setFormSchema] = useState<z.ZodObject<any>>(z.object({}));
  const [defaultValues, setDefaultValues] = useState<Record<string, any>>({});

  console.log({ customObjectName });

  //Get columns of form from Prisma schema
  const fetchColumnNames = async () => {
    console.log("fetching data");
    try {
      const response = await axios.get(`/api/collections/${customObjectName}`);
      const collectionData = await response.data;

      // Extract model from Prisma schema
      const modelRegex = new RegExp(
        `model ${customObjectName} \\{([^\\}]*)\\}`,
        "s"
      );
      const match = response.data.match(modelRegex);

      // Extract fields from model
      if (match) {
        const modelBody = match[1].trim();
        const fields = modelBody
          .split("\n")
          .map((field: string) => field.trim())
          .filter((field: string) => field.length > 0);

        const parsedFields = fields.map((field: string) => {
          const fieldComponents = field.split(/\s+/);
          return fieldComponents;
        });

        //prisma schema returns fields in 3 columns but since we only need the names take the first column
        const fieldNames = parsedFields.map((field: string[]) => field[0]);
        console.log(fieldNames);

        return fieldNames;
      }
    } catch (error) {
      console.error("Failed to fetch collection data:", error);
    }
  };

  const buildFormSchema = async () => {
    // Build dynamic Zod schema and default values
    const fieldNames = await fetchColumnNames();

    const schema: any = {};
    const defaults: any = {};

    fieldNames.forEach((field: string) => {
      schema[field] = z.string().optional(); // Customize validation per field type
      defaults[field] = data?.[field] || ""; // Set default value
    });

    setFormSchema(z.object(schema));
    setDefaultValues(defaults);
  };

  useEffect(() => {
    buildFormSchema();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    //reseting the form so that data is loaded in the default values properly - at time of form load data may not be available
    form.reset(defaultValues);
  }, []);

  // 2. Define a submit handler.
  const onSubmitNew = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/custom-objects/${customObjectName}`, values);
      router.push(`/custom-objects/${customObjectName}`);
      toast.success(`${customObjectName} record created successfully`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    const substanceId = data?.id;
    if (!substanceId) return;

    editSubstance(substanceId, values);
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
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field}
              disabled={!isEditing}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel>{field}</FormLabel>
                  <FormControl>
                    <Input placeholder={field} {...fieldProps} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};
