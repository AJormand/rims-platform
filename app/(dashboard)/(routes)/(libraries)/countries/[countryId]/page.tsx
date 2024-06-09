"use client";

import { useState, useEffect } from "react";

import { fetchCountry } from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";

import type { Country } from "@prisma/client";

export default function Country({ params }: { params: { countryId: string } }) {
  const [countryData, setCountryData] = useState<Country>();

  const fetchData = async () => {
    const data = await fetchCountry(params.countryId);
    setCountryData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex w-full h-[80vh] ">
      <SideNav sections={[{ name: "Basic Details", count: 0 }]} />
      {countryData && (
        <div className="w-full px-6 overflow-scroll">
          <Section
            name="Basic Details"
            expandedSections={{ "Basic Details": true }}
          >
            <BasicDetailsForm data={countryData} type="edit" />
          </Section>
        </div>
      )}
    </div>
  );
}
