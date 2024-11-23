"use client";
import { useEffect, useState } from "react";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";

import { BasicDetailsForm } from "../_components/basic-details-form";
import axios from "axios";

import { Button } from "@/components/ui/button";

export default function Collection({
  params,
}: {
  params: { templateName: string };
}) {
  const [templateData, setTemplateData] = useState<[string,string,string][]>([]);
  const { templateName } = params;

  const getTemplateData = async () => {
    const response = await axios.get(`/api/custom-objects-templates/${templateName}`);

   console.log(response.data);


  }

  useEffect(() => {
    getTemplateData();
  }, []);

  const handleInputChange = (
    index: number,
    fieldIndex: number,
    value: string
  ) => {
    const newCollectionData = [...templateData];
    newCollectionData[index][fieldIndex] = value;
    setTemplateData(newCollectionData);
  };

  const removeListData = (index: number) => {
    console.log({ index });
    console.log("removing list data");
    setTemplateData((prev) => {
      const newCollectionData = [...prev];
      newCollectionData.splice(index, 1);
      return newCollectionData;
    });
  };

  const updateListData = async () => {
    console.log("updating list data");

    const schemaDefinition = templateData
      .map((fieldElements: [string, string, string]) => fieldElements.join(" "))
      .join("\n");
    console.log({ schemaDefinition });

    const updatedModel = `model ${templateName} {
      ${schemaDefinition}
    }`;

    const response = await axios.put(`/api/collections/${templateName}`, {
      updatedModel,
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
              {templateData.map((field: string[], index: number) => (
                <div className="flex gap-10" key={index}>
                  <input
                    className="bg-slate-100 rounded-md p-1"
                    type="text"
                    value={field[0]}
                    onChange={(e) =>
                      handleInputChange(index, 0, e.target.value)
                    }
                  />
                  <input
                    className="bg-slate-100 rounded-md p-1"
                    type="text"
                    value={field[1]}
                    onChange={(e) =>
                      handleInputChange(index, 1, e.target.value)
                    }
                  />
                  <input
                    className="bg-slate-100 rounded-md p-1"
                    type="text"
                    value={field[2]}
                    onChange={(e) =>
                      handleInputChange(index, 2, e.target.value)
                    }
                  />
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => {
                      removeListData(index);
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
                setTemplateData([...templateData, ["", "", ""]])
              }
            >
              Add Field
            </Button>
            <Button
              variant={"outline"}
              className="mt-5"
              onClick={() => updateListData()}
            >
              Save
            </Button>
          </Section>
        </div>
      )}
    </div>
  );
}
