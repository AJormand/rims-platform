import { BasicDetailsForm } from "../../_components/basic-details-form";

import { Section } from "@/components/section";

export default function CreateCustomObject({
  params,
}: {
  params: { customObjectName: string };
}) {
  const { customObjectName } = params;
  return (
    <div className="container mx-auto py-10">
      <Section
        name="Basic Details"
        expandedSections={{ "Basic Details": true }}
      >
        <BasicDetailsForm
          data={null}
          type="new"
          customObjectName={customObjectName}
        />
      </Section>
    </div>
  );
}
