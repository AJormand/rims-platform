"use client";
import { useEffect, useState } from "react";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";

import { BasicDetailsForm } from "../_components/basic-details-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { custom, set } from "zod";


interface attribute {
  name: string;
  type: string;
  required: boolean;
  customAttribute: boolean;
}
interface template {
  id: string;
  name: string;
  attributes: attribute[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Template({
  params,
}: {
  params: { templateName: string };
}) {
  const [templateData, setTemplateData] = useState<template>({} as template);
  const { templateName } = params;

  const getTemplateData = async () => {
    const response = await axios.get(
      `/api/custom-objects-templates/${templateName}`
    );

    console.log(response)
    console.log(response.data.attributes);
    setTemplateData(response.data);
  };

  useEffect(() => {
    getTemplateData();
  }, []);

  const handleInputChange = (
    attributeIndex: number,
    attributeFieldName: string,
    attributeFieldValue: string | boolean
  ) => {
    console.log({ attributeIndex, attributeFieldName, attributeFieldValue });
    console.log(templateData);

    setTemplateData((prev)=> {
      if(!prev) return prev
      const updatedAttributes = [...prev.attributes];
      updatedAttributes[attributeIndex] = {
        ...updatedAttributes[attributeIndex],
        [attributeFieldName]: attributeFieldValue
      }

      return {
        ...prev,
        attributes: updatedAttributes
      }
    })
    console.log(templateData);
  };

  const removeAttribute = (index: number) => {
    console.log({ index });
    console.log("removing list data");
    setTemplateData((prev) => {
      const newCollectionData = [...prev];
      newCollectionData.splice(index, 1);
      return newCollectionData;
    });
  };

  const updateTemplateData = async () => {
    console.log("updating list data");


    const response = await axios.put(`/api/custom-objects-templates/${templateName}`, {
      templateData,
    });
    console.log(response);
  };

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />

      {templateData && (
        <div className="w-full px-6 overflow-scroll">
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50"></div>
          <Section name="Basic Details" isExpanded={true}>
            <div className="flex flex-col gap-3">
              {/* Column names */}
              <div className="grid grid-cols-[3fr_2fr_1fr_1fr_auto] gap-4 font-semibold bg-gray-200 p-2 rounded-md">
                <p className="font-semibold">Name</p>
                <p className="font-semibold">Type</p>
                <p className="text-center">Required</p>
                <p className="text-center">Custom</p>
                <p className="text-center">Remove</p>
              </div>
              {/* Columns */}
              {templateData.attributes?.map((field: attribute, index: number) => (
                <div
                  className="grid grid-cols-[3fr_2fr_1fr_1fr_auto] gap-4 items-center"
                  key={index}
                >
                  <input
                    className="bg-slate-100 rounded-md p-1"
                    name="name"
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    className="bg-slate-100 rounded-md p-1"
                    name="type"
                    type="text"
                    value={field.type}
                    onChange={(e) =>
                      handleInputChange(index, "type", e.target.value)
                    }
                  />

                  <input
                    className="bg-slate-100 rounded-md p-1"
                    name="required"
                    type="checkbox"
                    checked={field.required}
                    disabled={!field.customAttribute}
                    onChange={(e) =>
                      handleInputChange(index, "required", e.target.checked)
                    }
                  />

                  <input
                    className="bg-slate-100 rounded-md p-1"
                    name="customAttribute"
                    type="checkbox"
                    disabled={true}
                    checked={field.customAttribute}
                  />

                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => {
                      removeAttribute(index);
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant={"outline"}
              className="mt-5"
              onClick={() =>
                setTemplateData((prev: template) => ({
                  ...prev,
                  attributes: [
                    ...prev.attributes,
                    {
                      name: "",
                      type: "string",
                      required: false,
                      customAttribute: true,
                    },
                  ],
                }))
            }
            >
              Add Field
            </Button>
            <Button
              variant={"outline"}
              className="mt-5"
              onClick={() => updateTemplateData()}
            >
              Save
            </Button>
          </Section>
        </div>
      )}
    </div>
  );
}
