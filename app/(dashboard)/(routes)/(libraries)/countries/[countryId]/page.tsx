"use client";

import { useState, useEffect } from "react";

import { fetchCountry } from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";

import { Country } from "@prisma/client";

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
    <div className="container mx-auto py-10">
      {countryData && (
        <Section name="Basic Details" expanded={true}>
          <BasicDetailsForm data={countryData} type="edit" />
        </Section>
      )}
    </div>
  );
}
