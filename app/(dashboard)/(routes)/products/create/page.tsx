import { BasicDetailsForm } from "../_components/basic-details-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Section } from "../../../../../components/section";

export default function CreateProduct() {
  return (
    <div>
      <Section
        name="Basic Details"
        component={<BasicDetailsForm />}
        expanded={true}
      />
      <Section
        name="Applications"
        component={<BasicDetailsForm />}
        expanded={false}
      />
      <Section
        name="Registrations"
        component={<BasicDetailsForm />}
        expanded={false}
      />
    </div>
  );
}
