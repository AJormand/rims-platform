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

export default function Product({ params }: { params: { productId: string } }) {
  const [productData, setProductData] = useState(null);
  // const productData = await db.product.findUnique({
  //   where: {
  //     id: params.productId,
  //   },
  // });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${params.productId}`);
      console.log(response.data);
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full">
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
              data={[{ id: "xxx", name: "ccc", status: "success" }]}
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
