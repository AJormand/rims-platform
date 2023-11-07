"use client";

import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";

export default function CreateApplication() {
  return (
    <div>
      <Section
        name="Basic Details"
        component={<BasicDetailsForm data={null} type="new" />}
        expanded={true}
      />
    </div>
  );
}
