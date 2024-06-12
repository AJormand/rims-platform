"use client";
import { useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Registration as RegistrationType } from "@prisma/client";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { DataTable } from "@/components/ui/data-table";
import { StatusBar } from "@/components/status-bar";

import { BasicDetailsForm } from "./_components/basic-details-form";
import { productColumns } from "./_components/product-columns";

import { useFetchRegistration } from "@/app/services/hooks/hooks";
import { editRegistration } from "@/app/services/api-client/api-client";

import { Minimize2, Maximize2 } from "lucide-react";

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

  const handleSideNavClick = (name: string) => {
    setExpandedSectionsLocalStorage((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const expandAllSidenavSections = () => {
    setExpandedSectionsLocalStorage({
      "Basic Details": true,
      Countries: true,
      Products: true,
      Registrations: true,
    });
  };

  const collapseAllSidenavSections = () => {
    setExpandedSectionsLocalStorage({});
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
      <SideNav sections={sideNavSections} onClick={handleSideNavClick} />
      {isError && <div>Error</div>}

      {data && (
        <div className="w-full px-6 overflow-scroll">
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50">
            <StatusBar
              data={data.data}
              cvName={"product-status"}
              queryKey="registration"
              editApiFunction={editRegistration}
            />

            <div className="flex ml-auto gap-1 text-slate-500">
              <button
                className="border p-1 rounded-md hover:bg-slate-100"
                onClick={collapseAllSidenavSections}
              >
                <Minimize2 size={15} />
              </button>
              <button
                className="border p-1 rounded-md hover:bg-slate-100"
                onClick={expandAllSidenavSections}
              >
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
          {/* BASIC */}
          <Section
            name="Basic Details"
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Basic Details"]}
          >
            <BasicDetailsForm data={data?.data} type="edit" />
          </Section>

          {/* PRODUCTS */}
          <Section
            name="Products"
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Products"]}
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
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Applications"]}
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
