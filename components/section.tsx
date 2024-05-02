import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { boolean } from "zod";

interface SectionProps {
  name: string;
  children: React.ReactNode;
  expanded: boolean;
  defaultAccordionValue: string[];
}

export const Section = ({
  name,
  children,
  defaultAccordionValue,
}: SectionProps) => {
  const expanded = defaultAccordionValue?.includes("Basic Details");

  return (
    <div id={name}>
      <Accordion
        type="single"
        collapsible
        defaultValue={expanded ? "item-1" : ""}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
