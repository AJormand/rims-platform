"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { StatusBar } from "@/components/status-bar";

import { BasicDetailsForm } from "../_components/basic-details-form";

import {
  editSubstance,
  fetchSubstance,
} from "@/app/services/api-client/api-client";

export default function Substance({
  params,
}: {
  params: { substanceId: string };
}) {
  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-substance-sections", {
      "Basic Details": true,
    });
  const [expandedSections, setExpandedSections] = useState<Record<string, any>>(
    expandedSectionsLocalStorage
  );
  const [substanceData, setSubstanceData] = useState();

  const fetchData = async () => {
    const data = await fetchSubstance(params.substanceId);
    setSubstanceData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />

      {substanceData && (
        <div className="w-full px-6 overflow-scroll">
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50">
            <StatusBar
              data={substanceData}
              cvName={"product-status"}
              editApiFunction={editSubstance}
            />
          </div>
          <Section name="Basic Details" isExpanded={true}>
            <BasicDetailsForm data={substanceData} type="edit" />
          </Section>
        </div>
      )}
    </div>
  );
}
