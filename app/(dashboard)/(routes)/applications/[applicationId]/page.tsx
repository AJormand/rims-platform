"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  Application,
  Country,
  Product,
  Product2Application,
  Registration,
} from "@prisma/client";
import { SideNav } from "@/components/side-nav";
import { BasicDetailsForm } from "../_components/basic-details-form";

import { Section } from "@/components/section";

import { Button } from "@/components/ui/button";
import { AddRecordPopup } from "@/components/add-record-popup/add-record-popup";
import { DataTable } from "@/components/ui/data-table";

import { productAddRecordPopupColumns } from "./_components/product-add-record-popup-columns";
import { applicationProductColumns } from "./_components/application-product-columns";
import { applicationCountryColumns } from "./_components/application-country-columns";
import { countryAddRecordPopupColumns } from "./_components/country-add-record-popup-columns";
import { RecordActions } from "./_components/record-actions";
import { applicationRegistrationColumns } from "./_components/application-registration-columns";

interface ExtendedProduct2Application extends Product2Application {
  product: Product;
}

interface ExtendedApplication extends Application {
  products2Application: ExtendedProduct2Application[];
  countries: Country[];
  registrations: Registration[];
}

export default function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const [application, setApplication] = useState<
    ExtendedApplication | undefined
  >();
  const [linkedProducts, setLinkedProducts] = useState<Product[]>([]);
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");
  const [popUpData, setPopUpData] = useState([]);

  const sideNavSections = ["Basic Details", "Products"];

  const fetchApplication = async () => {
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
  };

  const {
    data: applicationData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["application"],
    queryFn: fetchApplication,
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

  const addCountry = async () => {
    setAddRecordPopupVisible("country");
    const data = await fetchPopUpData(
      `/api/countries`,
      application?.countries || []
    );
    setPopUpData(data);
  };

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {application && (
          <>
            <RecordActions data={applicationData} />
            {/* BASIC */}
            <Section name="Basic Details" expanded={true}>
              <BasicDetailsForm data={applicationData} type="edit" />
            </Section>

            {/* COUNTRIES */}
            <Section name="Countries" expanded={false}>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => addCountry()}
              >
                Add Country
              </Button>
              <DataTable
                columns={applicationCountryColumns}
                data={application.countries}
              />
              {addRecordPopupVisible === "country" && (
                <AddRecordPopup
                  name="Countries"
                  setPopVisible={setAddRecordPopupVisible}
                  data={popUpData}
                  //fetchDataRoute={`/api/products`}
                  storeDataRoute={`/api/applications/${params.applicationId}/countries`}
                  columns={countryAddRecordPopupColumns}
                  queryKey="application"
                />
              )}
            </Section>

            {/* PRODUCTS */}
            <Section name="Products" expanded={false}>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => addProduct()}
              >
                Add Product
              </Button>
              <DataTable
                columns={applicationProductColumns}
                data={application.products2Application}
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

            {/* REGISTRATIONS */}
            <Section name="Registrations" expanded={false}>
              <DataTable
                columns={applicationRegistrationColumns}
                data={application.registrations}
              />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
