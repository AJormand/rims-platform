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

  return (
    <div id={name} onClick={() => onClick?.(name)}>
      <Accordion
        type="single"
        collapsible
        defaultValue={isSectionExpanded ? "item-1" : ""}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
