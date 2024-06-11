"use client";
import { useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Registration as RegistrationType } from "@prisma/client";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";

import { DataTable } from "@/components/ui/data-table";

import { BasicDetailsForm } from "./_components/basic-details-form";
import { productColumns } from "./_components/product-columns";

import { useFetchRegistration } from "@/app/services/hooks/hooks";

export default function Registration({
  params,
}: {
  params: { registrationId: string };
}) {
  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-registration-sections", {
      "Basic Details": true,
      Products: true,
    });
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");
  const [popUpData, setPopUpData] = useState([]);

  const { data, isError, isLoading } = useFetchRegistration(
    params.registrationId
  );

  const handleSectionClick = (name: string) => {
    setExpandedSectionsLocalStorage((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const sideNavSections = useMemo(() => {
    if (!data)
      return [
        { name: "Basic Details", count: 0 },
        { name: "Products", count: 0 },
        { name: "Applications", count: 0 },
      ];

    //Application has only 1 product and 1 application therefore returned as object and needs to be converted to array
    const products = [data.data.product].length;
    const applicaitons = [data.data.application].length;

    return [
      { name: "Basic Details", count: 0 },
      { name: "Products", count: products },
      { name: "Applications", count: applicaitons },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen-minus-navbar-topbar">
        <SideNav.Skeleton />
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

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />
      {isError && <div>Error</div>}

      {data && (
        <div className="w-full px-6 overflow-scroll">
          {/* BASIC */}
          <Section
            name="Basic Details"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <BasicDetailsForm data={data?.data} type="edit" />
          </Section>

          {/* PRODUCTS */}
          <Section
            name="Products"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <DataTable
              columns={productColumns}
              data={[data.data.product]}
              filter={false}
            />
          </Section>

          {/* APPLICATIONS */}
          <Section
            name="Applications"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <DataTable
              columns={productColumns}
              data={[data.data.application]}
              filter={false}
            />
          </Section>
        </div>
      )}
    </div>
  );
}
