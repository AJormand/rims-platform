"use client";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import toast from "react-hot-toast";
import axios from "axios";

import { Registration as RegistrationType } from "@prisma/client";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { AddRecordPopup } from "@/components/add-record-popup/add-record-popup";
import { DataTable } from "@/components/ui/data-table";

import { BasicDetailsForm } from "../_components/basic-details-form";

import { useFetchRegistration } from "@/app/services/hooks/hooks";

interface ExtendedRegistration extends RegistrationType {}

export default function Registration({
  params,
}: {
  params: { registrationId: string };
}) {
  const {
    data: registration,
    isError,
    isLoading,
  } = useFetchRegistration(params.registrationId);

  console.log("regID", params.registrationId);

  console.log(registration?.data);

  const [expandedSections, setExpandedSections] = useLocalStorage<
    Record<string, any>
  >("expanded-registration-sections", { "Basic Details": true });
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");
  const [popUpData, setPopUpData] = useState([]);

  const handleSectionClick = (name: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  type ObjectWithId = {
    id: string;
  };

  const sideNavSections = ["Basic Details", "Products"];

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {registration && (
          <>
            {/* BASIC */}
            <Section
              name="Basic Details"
              expandedSections={expandedSections}
              onClick={handleSectionClick}
            >
              <></>
              <BasicDetailsForm data={registration?.data} type="edit" />
            </Section>

            {/* PRODUCTS */}
            {/* Countries */}
          </>
        )}
      </div>
    </div>
  );
}
