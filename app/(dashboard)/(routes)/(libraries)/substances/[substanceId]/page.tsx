"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { DataTable } from "@/components/ui/data-table";

export default function Substance({
  params,
}: {
  params: { substanceId: string };
}) {
  const [substanceData, setSubstanceData] = useState(null);

  useEffect(() => {
    fetchSubstance();
  }, []);

  const fetchSubstance = async () => {
    try {
      const response = await axios.get(`/api/substances/${params.substanceId}`);
      setSubstanceData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
