import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";

export default function CreateProduct() {
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
