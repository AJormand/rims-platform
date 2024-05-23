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

import { BasicDetailsForm } from "./_components/basic-details-form";

import { productColumns } from "./_components/product-columns";

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

  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-registration-sections", {
      "Basic Details": true,
      Products: true,
    });
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");
  const [popUpData, setPopUpData] = useState([]);

  const handleSectionClick = (name: string) => {
    setExpandedSectionsLocalStorage((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const sideNavSections = ["Basic Details", "Products"];

  if (isLoading) {
    return (
      <div className="flex w-full h-screen-minus-navbar">
        <SideNav sections={sideNavSections} />
        <div className="flex flex-col w-full px-6">
          <BasicDetailsForm.Skeleton />
          <div className="border-b-[1px] mt-4"></div>
          <Section.Skeleton />
          <Section.Skeleton />
          <Section.Skeleton />
          <Section.Skeleton />
        </div>
      </div>
    );
  }

  console.log(registration);

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {registration && (
          <>
            {/* BASIC */}
            <Section
              name="Basic Details"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <BasicDetailsForm data={registration?.data} type="edit" />
            </Section>

            {/* PRODUCTS */}
            <Section
              name="Products"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <DataTable
                columns={productColumns}
                data={[registration.data.product]}
                filter={false}
              />
            </Section>
            {/* Countries */}
          </>
        )}
      </div>
    </div>
  );
}
