"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { StatusBar } from "@/components/status-bar";

import { BasicDetailsForm } from "../../_components/basic-details-form";

import { fetchCustomObject } from "@/app/services/api-client/api-client";

export default function CustomObject({
  params,
}: {
  params: { customObjectName: string; customObjectId: string };
}) {
  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-substance-sections", {
      "Basic Details": true,
    });
  const [expandedSections, setExpandedSections] = useState<Record<string, any>>(
    expandedSectionsLocalStorage
  );
  const [customObjectData, setCustomObjectData] = useState();
  const { customObjectName, customObjectId } = params;

  const fetchData = async () => {
    const data = await fetchCustomObject(customObjectName, customObjectId);
    setCustomObjectData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />

      {customObjectData && (
        <div className="w-full px-6 overflow-scroll">
          <h1>CUSTOM</h1>
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50">
            <StatusBar
              data={customObjectData}
              cvName={"product-status"}
              editApiFunction={editSubstance}
            />
          </div>
          <Section name="Basic Details" isExpanded={true}>
            <BasicDetailsForm
              data={customObjectData}
              type="edit"
              customObjectName={customObjectName}
            />
          </Section>
        </div>
      )}
    </div>
  );
}
