"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { applicationColumns } from "./_components/application-columns";
import { registrationColumns } from "./_components/registration-columns";
import { activeSubstanceColumns } from "./_components/active-substance-columns";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { activeSubstanceAddRecordPopupColumns } from "./_components/active-substance-add-record-popup-columns";

import { AddRecordPopup } from "@/components/add-record-popup/add-record-popup";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";
import { StatusBar } from "./_components/status-bar";

import { usefetchProduct } from "@/app/services/hooks/hooks";
import { fetchPopUpData } from "@/app/services/api-client/api-client";

import {
  Product as ProductType,
  Substance,
  Application,
  Product2Substance,
} from "@prisma/client";

type ObjectWithId = {
  id: string;
};

interface ProductSubstance extends Product2Substance {
  substance: Substance;
}

export default function Product({ params }: { params: { productId: string } }) {
  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-product-sections", {
      "Basic Details": true,
    });

  const [popUpData, setPopUpData] = useState([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");

  const { data, isError, isLoading } = usefetchProduct(params.productId);
  console.log(data);

  const handleSectionClick = (name: string) => {
    setExpandedSectionsLocalStorage((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const addRecordPopup = async (
    popupName: string,
    fetchRoute: string,
    linkedRecords: ObjectWithId[]
  ) => {
    console.log("linked", linkedRecords);
    setAddRecordPopupVisible(popupName);
    const data = await fetchPopUpData(fetchRoute, linkedRecords);
    console.log(data);
    setPopUpData(data);
  };

  const sideNavSections = useMemo(() => {
    if (!data)
      return [
        { name: "Basic Details", count: 0 },
        { name: "Active Substances", count: 0 },
        { name: "Inactive Substances", count: 0 },
        { name: "Applications", count: 0 },
        { name: "Registrations", count: 0 },
      ];

    const activeSubstancesNum = data.productData.activeSubstances.length;
    const inactiveSubstancesNum = data.productData.inactiveSubstances.length;
    const applicationsNum = data.productData.applications.length;
    const registrationsNum = data.registrationsData.length;
    return [
      { name: "Basic Details", count: 0 },
      { name: "Active Substances", count: activeSubstancesNum },
      { name: "Inactive Substances", count: inactiveSubstancesNum },
      { name: "Applications", count: applicationsNum },
      { name: "Registrations", count: registrationsNum },
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
      <SideNav sections={sideNavSections} onClick={handleSectionClick} />
      {isError && <div>Error</div>}
      {data && (
        <div className="w-full px-6 overflow-scroll">
          <StatusBar data={data.productData.data} cv={"product-status"} />
          {/* BASIC DETAILS */}
          <Section
            name="Basic Details"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <BasicDetailsForm data={data?.productData.data} type="edit" />
          </Section>

          {/* ACTIVE SUBSTANCES */}
          <Section
            name="Active Substances"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => {
                addRecordPopup(
                  "activeSubstance",
                  "/api/substances",
                  data?.productData.activeSubstances.map(
                    (el: ProductSubstance) => el.substance
                  )
                );
              }}
            >
              Add
            </Button>
            <DataTable
              columns={activeSubstanceColumns}
              data={data.productData?.activeSubstances}
            />
            {addRecordPopupVisible === "activeSubstance" && (
              <AddRecordPopup
                name="Substances"
                setPopVisible={setAddRecordPopupVisible}
                data={popUpData.filter(
                  (el: any) => el.type === "Active Substance"
                )}
                //fetchDataRoute={`/api/substances`}
                storeDataRoute={`/api/products/${params.productId}/substances`}
                columns={activeSubstanceAddRecordPopupColumns}
                queryKey="product"
              />
            )}
          </Section>

          {/* INACTIVE SUBSTANCES */}
          <Section
            name="Inactive Substances"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => {
                addRecordPopup(
                  "inactiveSubstance",
                  "/api/substances",
                  data.productData?.inactiveSubstances.map(
                    (el: ProductSubstance) => el.substance
                  )
                );
              }}
            >
              Add
            </Button>
            <DataTable
              columns={activeSubstanceColumns}
              data={data.productData?.inactiveSubstances}
            />
            {addRecordPopupVisible === "inactiveSubstance" && (
              <AddRecordPopup
                name="Inactive Substances"
                setPopVisible={setAddRecordPopupVisible}
                data={popUpData.filter(
                  (el: any) => el.type !== "Active Substance"
                )}
                //fetchDataRoute={`/api/substances`}
                storeDataRoute={`/api/products/${params.productId}/substances`}
                columns={activeSubstanceAddRecordPopupColumns}
                queryKey="product"
              />
            )}
          </Section>

          {/* APPLICATIONS */}

          <Section
            name="Applications"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <DataTable
              columns={applicationColumns}
              data={data.productData?.applications}
            />
          </Section>

          {/* REGISTRATIONS */}
          <Section
            name="Registrations"
            expandedSections={expandedSectionsLocalStorage}
            onClick={handleSectionClick}
          >
            <DataTable
              columns={registrationColumns}
              data={data.registrationsData}
            />
          </Section>
        </div>
      )}
    </div>
  );
}
