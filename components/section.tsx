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
  isExpanded?: boolean;
  onClick?: (name: string) => void;
}

export const Section = ({
  name,
  children,
  isExpanded,
  onClick,
}: SectionProps) => {
  return (
    <div
      id={name}
      onClick={() => onClick?.(name)}
      key={`${name}-${isExpanded}`}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue={isExpanded ? "item-1" : ""}
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
