"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Application, Product, Product2Application } from "@prisma/client";
import { SideNav } from "@/components/side-nav";
import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";

import { Button } from "@/components/ui/button";
import { AddRecordPopup } from "@/components/add-record-popup/add-record-popup";
import { DataTable } from "@/components/ui/data-table";
import { productAddRecordPopupColumns } from "./_components/product-add-record-popup-columns";
import { applicationProductColumns } from "./_components/application-product-columns";

export default function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const [application, setApplication] = useState<Application>();
  const [linkedProducts, setLinkedProducts] = useState<Product[]>([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");
  const [popUpData, setPopUpData] = useState([]);

  const sideNavSections = ["Basic Details", "Products"];

  const {
    data: applicationData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/api/applications/${params.applicationId}`
        );
        console.log("usequery", data);
        const productsArr = data?.products2Application?.map(
          (item: any) => item.product
        );
        setApplication(data);
        setLinkedProducts(productsArr);
        return data;
      } catch (error) {
        toast.error(`"${error}`);
      }
    },
  });

  type ObjectWithId = {
    id: string;
  };

  const fetchPopUpData = async (url: string, linkedRecords: ObjectWithId[]) => {
    try {
      const { data } = await axios.get(url);
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

  const addProduct = async () => {
    setAddRecordPopupVisible("product");
    const data = await fetchPopUpData(`/api/products`, linkedProducts);
    setPopUpData(data);
  };

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {application && (
          <>
            <Section name="Basic Details" expanded={true}>
              <BasicDetailsForm data={applicationData} type="edit" />
            </Section>
            <Section name="Products" expanded={true}>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => addProduct()}
              >
                Add Product
              </Button>
              <DataTable
                columns={applicationProductColumns}
                data={linkedProducts}
              />
              {addRecordPopupVisible === "product" && (
                <AddRecordPopup
                  name="Products"
                  setPopVisible={setAddRecordPopupVisible}
                  data={popUpData}
                  //fetchDataRoute={`/api/products`}
                  storeDataRoute={`/api/applications/${params.applicationId}/products`}
                  columns={productAddRecordPopupColumns}
                  queryKey="application"
                />
              )}
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
