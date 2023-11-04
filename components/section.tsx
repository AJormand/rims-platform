import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SectionProps {
  name: string;
  component: React.ReactNode;
  expanded: boolean;
}

export const Section = ({ name, component, expanded }: SectionProps) => {
  return (
    <div id={name}>
      <Accordion
        type="single"
        collapsible
        defaultValue={expanded ? "item-1" : ""}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>{component}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
