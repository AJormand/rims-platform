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
  defaultAccordionValue: string[];
  onClick?: (name: string) => void;
}

export const Section = ({
  name,
  children,
  defaultAccordionValue,
  onClick,
}: SectionProps) => {
  const expanded = defaultAccordionValue?.includes(name);
  console.log("xxx", defaultAccordionValue);

  return (
    <div id={name} onClick={() => onClick?.(name)}>
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
