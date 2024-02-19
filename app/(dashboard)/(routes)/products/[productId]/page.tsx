"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { applicationColumns } from "./_components/application-columns";
import { activeSubstanceColumns } from "./_components/active-substance-columns";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { activeSubstanceAddRecordPopupColumns } from "./_components/active-substance-add-record-popup-columns";

import { AddRecordPopup } from "@/components/add-record-popup/add-record-popup";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";

import {
  Product,
  Substance,
  Application,
  Product2Substance,
} from "@prisma/client";

import { usefetchProduct } from "@/app/hooks/hooks";

type ProductData = Product & {
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

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${params.productId}`);

      const activeSubstances = data.productSubstances.filter(
        (productSubstance: ProductSubstance) =>
          productSubstance.substance.type === "Active Substance"
      );

      const inactiveSubstances = data.productSubstances.filter(
        (productSubstance: ProductSubstance) =>
          productSubstance.substance.type !== "Active Substance"
      );

      const applications = data.productApplications.map(
        (item: any) => item.application
      );

      return {
        data,
        activeSubstances,
        inactiveSubstances,
        applications,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const {
    data: productData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

  // const {
  //   data: productData,
  //   isError,
  //   isLoading,
  // } = usefetchProduct(params.productId);

  const fetchPopUpData = async (url: string, linkedRecords: ObjectWithId[]) => {
    try {
      const { data } = await axios.get(url);
      console.log(data);
      console.log(linkedRecords);
      const filteredData = data.filter(
        (itemAll: ObjectWithId) =>
          !linkedRecords.some(
            (itemLinked: ObjectWithId) => itemLinked.id === itemAll.id
          )
      );
      return filteredData;
    } catch (error) {
      toast.error(`"${error}`);
    }
  };

  const onAddClick = async (
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
      {!isLoading && (
        <div className="w-full px-6">
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
                onAddClick(
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
                onAddClick(
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
