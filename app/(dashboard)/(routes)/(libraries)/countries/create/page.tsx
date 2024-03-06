import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";

export default function CreateCountry() {
  return (
    <div className="container mx-auto py-10">
      <Section name="Basic Details" expanded={true}>
        <BasicDetailsForm data={null} type="new" />
      </Section>
    </div>
  );
}
