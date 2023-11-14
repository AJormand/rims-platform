"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import axios from "axios";

import { SideNav } from "./_component/product-side-nav";
import { applicationColumns } from "./_component/application-columns";
import { Section } from "@/components/section";
import { BasicDetailsForm } from "../_components/basic-details-form";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import exp from "constants";
import { set } from "react-hook-form";

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

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav />
      <div className="w-full px-6">
        {productData && (
          <Section
            name="Basic Details"
            component={<BasicDetailsForm data={productData} type="edit" />}
            expanded={true}
          />
        )}
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
