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
  const [productData, setProductData] = useState<ProductData>();
  const [activeSubstances, setActiveSubstances] = useState<ProductSubstance[]>(
    []
  );
  const [inactiveSubstances, setInactiveSubstances] = useState<
    ProductSubstance[]
  >([]);
  const [applications, setApplications] = useState([]);
  const [popUpData, setPopUpData] = useState([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");

  const { data: productData2 } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/products/${params.productId}`);
        setProductData(data);

        setActiveSubstances(
          data.productSubstances.filter(
            (productSubstance: ProductSubstance) =>
              productSubstance.substance.type === "Active Substance"
          )
        );
        setInactiveSubstances(
          data.productSubstances.filter(
            (productSubstance: ProductSubstance) =>
              productSubstance.substance.type !== "Active Substance"
          )
        );

        setApplications(
          data.productApplications.map((item: any) => item.application)
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

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
      {productData && (
        <div className="w-full px-6">
          {/* BASIC DETAILS */}
          <Section name="Basic Details" expanded={true}>
            <BasicDetailsForm data={productData} type="edit" />
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
                  activeSubstances.map((el) => el.substance)
                );
              }}
            >
              Add
            </Button>
            <DataTable
              columns={activeSubstanceColumns}
              data={activeSubstances}
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
                  inactiveSubstances.map((el) => el.substance)
                );
              }}
            >
              Add
            </Button>
            <DataTable
              columns={activeSubstanceColumns}
              data={inactiveSubstances}
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
              data={applications}
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
