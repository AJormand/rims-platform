"use client";

import { useState, useEffect } from "react";

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

type ProductData = ProductType & {
  include: { application: true; substance: true };
  productSubstances: Substance[];
  productApplications: Application[];
};

type ObjectWithId = {
  id: string;
};

interface ProductSubstance extends Product2Substance {
  substance: Substance;
}

export default function Product({ params }: { params: { productId: string } }) {
  const [popUpData, setPopUpData] = useState([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");

  const {
    data: productData,
    isError,
    isLoading,
  } = usefetchProduct(params.productId);

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
      {productData && (
        <div className="w-full px-6">
          <StatusBar data={productData.data} cv={"product-status"} />
          {/* BASIC DETAILS */}
          <Section name="Basic Details" expanded={true}>
            <BasicDetailsForm data={productData?.data} type="edit" />
          </Section>

          {/* ACTIVE SUBSTANCES */}
          <Section name="Active Substances" expanded={false}>
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => {
                addRecordPopup(
                  "activeSubstance",
                  "/api/substances",
                  productData?.activeSubstances.map(
                    (el: ProductSubstance) => el.substance
                  )
                );
              }}
            >
              Add
            </Button>
            <DataTable
              columns={activeSubstanceColumns}
              data={productData?.activeSubstances}
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
          <Section name="Inactive Substances" expanded={false}>
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => {
                addRecordPopup(
                  "inactiveSubstance",
                  "/api/substances",
                  productData?.inactiveSubstances.map(
                    (el: ProductSubstance) => el.substance
                  )
                );
              }}
            >
              Add
            </Button>
            <DataTable
              columns={activeSubstanceColumns}
              data={productData?.inactiveSubstances}
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

          <Section name="Applications" expanded={false}>
            <DataTable
              columns={applicationColumns}
              data={productData?.applications}
              createRoute="/applications/create"
            />
          </Section>

          {/* REGISTRATIONS */}
          <Section name="Registrations" expanded={false}>
            <DataTable
              columns={applicationColumns}
              data={[{ id: "xxx", name: "ccc", status: "success" }]}
              createRoute="/registrations/create"
            />
          </Section>
        </div>
      )}
    </div>
  );
}
