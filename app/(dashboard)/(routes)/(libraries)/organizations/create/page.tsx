import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";

export default function CreateSubstance() {
  return (
    <div className="container mx-auto py-10">
      <Section
        name="Basic Details"
        expandedSections={{ "Basic Details": true }}
      >
        <BasicDetailsForm data={null} type="new" />
      </Section>
    </div>
  );
}
