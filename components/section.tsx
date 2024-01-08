import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SectionProps {
  name: string;
  children: React.ReactNode;
  expanded: boolean;
}

export const Section = ({ name, children, expanded }: SectionProps) => {
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
