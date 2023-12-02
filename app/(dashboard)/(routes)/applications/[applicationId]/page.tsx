"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [addProductPopupVisible, setAddProductPopupVisible] =
    useState<boolean>(false);

  const fetchApplication = async () => {
    try {
      const response = await axios.get(
        `/api/applications/${params.applicationId}`
      );
      setApplication(response.data);

      const productsArr = response.data.products2Application.map(
        (item: any) => item.product
      );
      setProducts(productsArr);
    } catch (error) {
      toast.error(`"${error}`);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const sideNavSections = ["Basic Details", "Products"];

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {application && (
          <>
            <Section
              name="Basic Details"
              component={<BasicDetailsForm data={application} type="edit" />}
              expanded={true}
            />
            <Section
              name="Products"
              component={
                <>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => {
                      setAddProductPopupVisible((prev) => !prev);
                    }}
                  >
                    Add Product
                  </Button>
                  <DataTable
                    columns={applicationProductColumns}
                    data={products}
                  />
                  {addProductPopupVisible && (
                    <AddRecordPopup
                      name="Products"
                      setPopVisible={setAddProductPopupVisible}
                      fetchDataRoute={`/api/products`}
                      storeDataRoute={`/api/applications/${params.applicationId}/products`}
                      columns={productAddRecordPopupColumns}
                    />
                  )}
                </>
              }
              expanded={true}
            />
          </>
        )}
      </div>
    </div>
  );
}
