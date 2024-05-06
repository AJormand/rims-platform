"use client";
import { useState, useEffect } from "react";

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
  expandedSections: Record<string, any>;
  onClick?: (name: string) => void;
}

export const Section = ({
  name,
  children,
  expandedSections,
  onClick,
}: SectionProps) => {
  const isSectionExpanded = expandedSections[name] === true;
  console.log(expandedSections);
  const [key, setKey] = useState(`${name}-${isSectionExpanded}`); // Key to trigger re-render of Accordion component

  useEffect(() => {
    // changing of key will trigger re-render of Accordion component
    setKey(`${name}-${isSectionExpanded}`);
  }, [isSectionExpanded]);

  return (
    <div id={name} onClick={() => onClick?.(name)}>
      <Accordion
        type="single"
        collapsible
        defaultValue={isSectionExpanded ? "item-1" : ""}
        key={key}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
