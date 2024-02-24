"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { DataTable } from "@/components/ui/data-table";
import { fetchSubstance } from "@/app/services/api-client/api-client";

export default function Substance({
  params,
}: {
  params: { substanceId: string };
}) {
  const [substanceData, setSubstanceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    const data = await fetchSubstance(params.substanceId);
    setSubstanceData(data)
    console.log(data)
    }
    fetchData();
  }, []);


  const sideNavSections = ["Basic Details"];

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {substanceData && (
          <Section name="Basic Details" expanded={true}>
            <BasicDetailsForm data={substanceData} type="edit" />
          </Section>
        )}
      </div>
    </div>
  );
}
