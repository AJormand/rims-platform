"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import axios from "axios";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { DataTable } from "@/components/ui/data-table";
import { fetchSubstance } from "@/app/services/api-client/api-client";

export default function Substance({
  params,
}: {
  params: { substanceId: string };
}) {
  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-substance-sections", {
      "Basic Details": true,
    });
  const [expandedSections, setExpandedSections] = useState<Record<string, any>>(
    expandedSectionsLocalStorage
  );
  const [substanceData, setSubstanceData] = useState();

  const fetchData = async () => {
    const data = await fetchSubstance(params.substanceId);
    setSubstanceData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSectionClick = (name: string) => {
    const newExpandedSections = {
      ...expandedSectionsLocalStorage,
      [name]: !expandedSectionsLocalStorage[name],
    };
    setExpandedSections(newExpandedSections);
    setExpandedSectionsLocalStorage(newExpandedSections);
  };

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} onClick={handleSectionClick} />
      <div className="w-full px-6 overflow-scroll">
        {substanceData && (
          <Section
            name="Basic Details"
            expandedSections={expandedSections}
            onClick={handleSectionClick}
          >
            <BasicDetailsForm data={substanceData} type="edit" />
          </Section>
        )}
      </div>
    </div>
  );
}
