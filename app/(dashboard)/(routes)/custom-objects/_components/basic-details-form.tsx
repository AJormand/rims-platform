"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

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
  editCustomObjectData,
  fetchCustomObjectTemplate,
} from "@/app/services/api-client/api-client";

interface Field {
  name: string;
  type: "string" | "number";
  required: boolean;
}

export const BasicDetailsForm: React.FC<{
  data: Record<string, any> | null;
  type: "new" | "edit";
  customObjectName: string;
}> = ({ data, type, customObjectName }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(type === "new" ? true : false);
  const [formSchema, setFormSchema] = useState<z.ZodObject<any>>(z.object({}));
  const [defaultValues, setDefaultValues] = useState<Record<string, any>>({});
  const systemSpecificFields = ["id", "createdAt", "updatedAt"];

  const buildFieldSchema = (field: Field) => {
    let schema;

    // Determine the type of the field
    switch (field.type) {
      case "string":
        schema = z.string();
        break;
      case "number":
        schema = z.number();
        break;
      default:
        throw new Error(`Unsupported type: ${field.type}`);
    }

    // Apply required or optional
    schema = field.required ? schema : schema.optional();

    return schema;
  };

  //Get columns of form from Prisma schema
  const buildFormSchema = async () => {
    const customObjectTemplate = await fetchCustomObjectTemplate(
      customObjectName
    );

    console.log("customObjectTemplate", customObjectTemplate);

    const schema: any = {};
    const defaults: any = {};

    customObjectTemplate.attributes.forEach((field: Field) => {
      schema[field.name] = buildFieldSchema(field); // Use dynamic field schema
      defaults[field.name] = data?.[field.name] || ""; // Set default value
    });

    console.log({ defaults });

    setFormSchema(z.object(schema)); // Update the Zod schema
    setDefaultValues(defaults); // Update default values
  };

  useEffect(() => {
    buildFormSchema();
  }, [customObjectName, data]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    //reseting the form so that data is loaded in the default values properly - at time of form load data may not be available
    form.reset(defaultValues);
  }, [defaultValues, formSchema]);

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
    const id = data?.id;
    if (!id) return;

    editCustomObjectData(id, customObjectName, values);
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
