"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { applicationColumns } from "./_components/application-columns";
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
  const [expandedSections, setExpandedSections] = useLocalStorage<
    Record<string, any>
  >("expanded-product-sections", { "Basic Details": true });
  const [popUpData, setPopUpData] = useState([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");

  const { data, isError, isLoading } = usefetchProduct(params.productId);

  const defaultAccordionValue: string[] = Object.keys(expandedSections).reduce(
    (acc: string[], key: string) => {
      if (expandedSections[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const handleSectionClick = (name: string) => {
    setExpandedSections((prev) => ({
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

  const sideNavSections = [
    "Basic Details",
    "Active Substances",
    "Inactive Substances",
    "Applications",
    "Registrations",
  ];

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <div className="w-full px-6">
          <StatusBar data={data.productData.data} cv={"product-status"} />
          {/* BASIC DETAILS */}
          <Section
            name="Basic Details"
            defaultAccordionValue={defaultAccordionValue}
            onClick={handleSectionClick}
          >
            <BasicDetailsForm data={data?.productData.data} type="edit" />
          </Section>

          {/* ACTIVE SUBSTANCES */}
          <Section
            name="Active Substances"
            defaultAccordionValue={defaultAccordionValue}
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
            defaultAccordionValue={defaultAccordionValue}
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
            defaultAccordionValue={defaultAccordionValue}
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
            defaultAccordionValue={defaultAccordionValue}
            onClick={handleSectionClick}
          >
            <DataTable
              columns={applicationColumns}
              data={data.registrationsData}
            />
          </Section>
        </div>
      )}
    </div>
  );
}
