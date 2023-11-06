"use client";

import { useState } from "react";

import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { AddProductPopup } from "../_components/product-popup/popup";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../_components/application-product-columns";

export default function CreateApplication() {
  const [addProductPopupVisible, setAddProductPopupVisible] = useState(false);

  return (
    <div>
      <Section
        name="Basic Details"
        component={<BasicDetailsForm data={null} type="new" />}
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
              columns={columns}
              data={[{ id: "ssss", name: "ccc" }]}
              createRoute="/registrations/create"
            />
            {addProductPopupVisible && (
              <AddProductPopup
                setAddProductPopupVisible={setAddProductPopupVisible}
              />
            )}
          </>
        }
        expanded={true}
      />
    </div>
  );
}
