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
  params: { collectionName: string };
}) {
  const [collectionData, setCollectionData] = useState<[string,string,string][]>([]);
  const { collectionName } = params;

  const getListData = async () => {
    const response = await axios.get(`/api/collections/${collectionName}`);

    // Extract model from Prisma schema
    const modelRegex = new RegExp(
      `model ${collectionName} \\{([^\\}]*)\\}`,
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

      // join fields into three columns as prisma schema contains 3 columns - last column in prisma schema can contain spaces therefore joined together
      const parsedFieldsInThreeColumns = parsedFields.map((field: string[]) => [
        field[0],
        field[1],
        field.slice(2).join(" "),
      ]);
      setCollectionData(parsedFieldsInThreeColumns);
      console.log({ parsedFieldsInThreeColumns });
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  const handleInputChange = (
    index: number,
    fieldIndex: number,
    value: string
  ) => {
    const newCollectionData = [...collectionData];
    newCollectionData[index][fieldIndex] = value;
    setCollectionData(newCollectionData);
  };

  const removeListData = (index: number) => {
    console.log({ index });
    console.log("removing list data");
    setCollectionData((prev) => {
      const newCollectionData = [...prev];
      newCollectionData.splice(index, 1);
      return newCollectionData;
    });
  };

  const updateListData = async () => {
    console.log("updating list data");

    const schemaDefinition = collectionData
      .map((fieldElements: [string, string, string]) => fieldElements.join(" "))
      .join("\n");
    console.log({ schemaDefinition });

    const updatedModel = `model ${collectionName} {
      ${schemaDefinition}
    }`;

    const response = await axios.put(`/api/collections/${collectionName}`, {
      updatedModel,
    });
    console.log(response);
  };

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />

      {collectionData && (
        <div className="w-full px-6 overflow-scroll">
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50"></div>
          <Section name="Basic Details" isExpanded={true}>
            <div className="flex flex-col gap-3">
              {collectionData.map((field: string[], index: number) => (
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
                setCollectionData([...collectionData, ["", "", ""]])
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
