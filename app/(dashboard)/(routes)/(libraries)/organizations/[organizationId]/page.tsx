import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";


export default function Organization()  {
    return (
        <div className="container mx-auto py-10">
        <Section name="Basic Details" expanded={true}>
          <BasicDetailsForm data={null} type="edit" />
        </Section>
      </div>
    )
    }