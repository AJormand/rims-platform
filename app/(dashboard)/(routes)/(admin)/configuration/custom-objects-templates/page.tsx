"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateNewTemplatePopup } from "./_components/create-new-template-popup";

import { builtInCollections } from "@/constants/builtInCollections";
import { fetchCustomObjectTemplates } from "@/app/services/api-client/api-client";

export default function CustomObjectsTemplates() {
  const [customObjectsTemplates, setCustomObjectsTemplates] = useState([]);
  const [createNewPopupVisisble, setCreateNewPopupVisisble] = useState(false);

  useEffect(() => {
    getCustomObjectsTemplates();
  }, []);

  const getCustomObjectsTemplates = async () => {
    const data = await fetchCustomObjectTemplates();
    setCustomObjectsTemplates(data);
  };

  const deleteCustomObjectTemplate = async (name: string) => {
    try {
      const response = await axios.delete(
        `/api/custom-objects-templates/${name}`
      );
      console.log(response);
      if (response.status === 200) {
        getCustomObjectsTemplates();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center">
        <Button
          variant={"outline"}
          onClick={() => setCreateNewPopupVisisble(true)}
        >
          Create Custom Object Template
        </Button>

        <div className="mt-5 flex flex-col w-full bg-slate-200">
          {customObjectsTemplates.map((template: any) => (
            <div className="flex max-w-sm justify-between">
              <div key={template.name}>{template.name}</div>
              <div>
                <Button
                  variant={"outline"}
                  disabled={builtInCollections.includes(template.name)}
                  onClick={() => deleteCustomObjectTemplate(template.name)}
                >
                  Delete
                </Button>
                <Button variant={"outline"}>
                  <Link
                    href={`/configuration/custom-objects-templates/${template.name}`}
                  >
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {createNewPopupVisisble && (
        <CreateNewTemplatePopup
          setCreateNewPopupVisisble={setCreateNewPopupVisisble}
        />
      )}
    </div>
  );
}
