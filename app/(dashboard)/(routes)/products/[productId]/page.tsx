"use client";

import { useState, useEffect } from "react";

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

// type ProductData = Product & {
//   productSubstances: Substance[];
//   productApplications: Application[];
// };
type ProductData = Product & {
  include: { application: true; substance: true };
  productSubstances: Substance[];
  productApplications: Application[];
};

export default function Product({ params }: { params: { productId: string } }) {
  const [productData, setProductData] = useState<ProductData>();
  const [applications, setApplications] = useState([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] = useState(false);
  let productSubstances;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${params.productId}`);
      console.log(response.data);
      setProductData(response.data);

      // setProductData({
      //   ...response.data,
      //   applications: response.data.productApplications.map(
      //     (item: any) => item.application
      //   ),
      //   substances: response.data.productSubstances.map(
      //     (item: any) => item.substance
      //   ),
      // });
      productSubstances = response.data.productSubstances;

      setApplications(
        response.data.productApplications.map((item: any) => item.application)
      );
    } catch (error) {
      console.log(error);
    }
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
          <Section
            name="Basic Details"
            component={<BasicDetailsForm data={productData} type="edit" />}
            expanded={true}
          />

          <Section
            name="Active Substances"
            component={
              <>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => {
                    setAddRecordPopupVisible((prev) => !prev);
                  }}
                >
                  Add
                </Button>
                <DataTable
                  columns={activeSubstanceColumns}
                  data={
                    productData.productSubstances.filter(
                      (el: any) => el.substance.type === "Active Substance"
                    ) as any
                  }
                />
                {addRecordPopupVisible && (
                  <AddRecordPopup
                    name="Substances"
                    setPopVisible={setAddRecordPopupVisible}
                    fetchDataRoute={`/api/substances`}
                    storeDataRoute={`/api/products/${params.productId}/substances`}
                    columns={activeSubstanceAddRecordPopupColumns}
                  />
                )}
              </>
            }
            expanded={false}
          />

          <Section
            name="Inactive Substances"
            component={
              <>
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => {
                    setAddRecordPopupVisible((prev) => !prev);
                  }}
                >
                  Add
                </Button>
                {console.log(productData.productSubstances)}
                <DataTable
                  columns={activeSubstanceColumns}
                  data={
                    productData.productSubstances.filter(
                      (el: any) => el.substance.type !== "Active Substance"
                    ) as any
                  }
                />
                {addRecordPopupVisible && (
                  <AddRecordPopup
                    name="Inactive Substances"
                    setPopVisible={setAddRecordPopupVisible}
                    fetchDataRoute={`/api/substances`}
                    storeDataRoute={`/api/products/${params.productId}/substances`}
                    columns={activeSubstanceAddRecordPopupColumns}
                  />
                )}
              </>
            }
            expanded={false}
          />

          <Section
            name="Applications"
            component={
              <DataTable
                columns={applicationColumns}
                data={applications}
                createRoute="/applications/create"
              />
            }
            expanded={false}
          />
          <Section
            name="Registrations"
            component={
              <DataTable
                columns={applicationColumns}
                data={[{ id: "xxx", name: "ccc", status: "success" }]}
                createRoute="/registrations/create"
              />
            }
            expanded={false}
          />
        </div>
      )}
    </div>
  );
}
