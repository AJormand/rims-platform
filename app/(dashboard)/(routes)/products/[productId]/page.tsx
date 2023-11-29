"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import { SideNav } from "@/components/side-nav";
import { applicationColumns } from "./_component/application-columns";
import { Section } from "@/components/section";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { DataTable } from "@/components/ui/data-table";

export default function Product({ params }: { params: { productId: string } }) {
  const [productData, setProductData] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${params.productId}`);
      console.log(response.data.productApplications);
      setProductData(response.data);
      setApplications(
        response.data.productApplications.map((item: any) => item.application)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sideNavSections = ["Basic Details", "Applications", "Registrations"];

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {productData && (
          <Section
            name="Basic Details"
            component={<BasicDetailsForm data={productData} type="edit" />}
            expanded={true}
          />
        )}
        <Section
          name="Active Substances"
          component={
            <DataTable
              columns={applicationColumns}
              data={applications}
              createRoute="/substances/create"
            />
          }
          expanded={false}
        />

        <Section
          name="Inactive Substances"
          component={
            <DataTable
              columns={applicationColumns}
              data={applications}
              createRoute="/substances/create"
            />
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
    </div>
  );
}
