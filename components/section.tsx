"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Skeleton } from "./ui/skeleton";

import { ChevronDown } from "lucide-react";

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

Section.Skeleton = function skeletonSection() {
  return (
    <div className="w-full border-b-[1px] border-gray-200 py-4 flex justify-between">
      <Skeleton className="h-8 w-48 rounded-sm" />
      <ChevronDown className="w-4 text-gray-400" />
    </div>
  );
};
