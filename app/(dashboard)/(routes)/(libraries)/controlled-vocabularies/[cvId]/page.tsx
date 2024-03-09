"use client";

import { useState, useEffect } from "react";

import { fetchControlledVocabulary } from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";

import { ControlledVocabulary } from "@prisma/client";

export default function ControlledVocabulary({ params }: { params: { cvId: string } }) {
  const [controlledVocabularyData, setControlledVocabularyData] = useState<ControlledVocabulary>();

  const fetchData = async () => {
    const data = await fetchControlledVocabulary(params.cvId);
    setControlledVocabularyData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {controlledVocabularyData && (
        <Section name="Basic Details" expanded={true}>
          <BasicDetailsForm data={controlledVocabularyData} type="edit" />
        </Section>
      )}
    </div>
  );
}
