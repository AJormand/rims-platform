"use client";

import { useState, useEffect } from "react";

import { fetchControlledVocabulary } from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";

import type { ControlledVocabulary } from "@prisma/client";

export default function ControlledVocabulary({
  params,
}: {
  params: { cvId: string };
}) {
  const [controlledVocabularyData, setControlledVocabularyData] =
    useState<ControlledVocabulary>();

  const fetchData = async () => {
    const data = await fetchControlledVocabulary(params.cvId);
    setControlledVocabularyData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />
      {controlledVocabularyData && (
        <div className="w-full px-6 overflow-scroll">
          <Section name="Basic Details" isExpanded={true}>
            <BasicDetailsForm data={controlledVocabularyData} type="edit" />
          </Section>
        </div>
      )}
    </div>
  );
}
