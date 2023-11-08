"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Application } from "@prisma/client";
import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";

import { Button } from "@/components/ui/button";
import { AddProductPopup } from "../_components/product-popup/popup";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../_components/application-product-columns";

export default function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const [application, setApplication] = useState<Application>();
  const [addProductPopupVisible, setAddProductPopupVisible] =
    useState<boolean>(false);

  const fetchApplication = async () => {
    try {
      const response = await axios.get(
        `/api/applications/${params.applicationId}`
      );
      setApplication(response.data);
    } catch (error) {
      toast.error(`"${error}`);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <div>
      {application && (
        <>
          <Section
            name="Basic Details"
            component={<BasicDetailsForm data={application} type="new" />}
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
        </>
      )}
    </div>
  );
}
