"use client";
import { useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Application as ApplicationType,
  Country,
  Product,
  Product2Application,
  Registration,
} from "@prisma/client";

import { SideNav } from "@/components/side-nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { AddRecordPopup } from "@/components/add-record-popup/add-record-popup";
import { DataTable } from "@/components/ui/data-table";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { productAddRecordPopupColumns } from "./_components/product-add-record-popup-columns";
import { applicationProductColumns } from "./_components/application-product-columns";
import { applicationCountryColumns } from "./_components/application-country-columns";
import { countryAddRecordPopupColumns } from "./_components/country-add-record-popup-columns";
import { RecordActions } from "./_components/record-actions";
import { applicationRegistrationColumns } from "./_components/application-registration-columns";

import { useFetchApplication } from "@/app/services/hooks/hooks";

interface ExtendedProduct2Application extends Product2Application {
  product: Product;
}

interface ExtendedApplication extends ApplicationType {
  products2Application: ExtendedProduct2Application[];
  countries: Country[];
  registrations: Registration[];
}

export default function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const { data, isError, isLoading } = useFetchApplication(
    params.applicationId
  );

  const [expandedSectionsLocalStorage, setExpandedSectionsLocalStorage] =
    useLocalStorage<Record<string, any>>("expanded-application-sections", {
      "Basic Details": true,
    });
  const [addRecordPopupVisible, setAddRecordPopupVisible] =
    useState<string>("");
  const [popUpData, setPopUpData] = useState([]);

  const handleSectionClick = (name: string) => {
    setExpandedSectionsLocalStorage((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

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
    const response = await fetchPopUpData(
      `/api/products`,
      data?.applicationProducts
    );
    setPopUpData(response);
  };

  const addCountry = async () => {
    setAddRecordPopupVisible("country");
    const response = await fetchPopUpData(
      `/api/countries`,
      data?.applicationData.countries || []
    );
    setPopUpData(response);
  };

  const sideNavSections = useMemo(() => {
    if (!data)
      return [
        { name: "Basic Details", count: 0 },
        { name: "Countries", count: 0 },
        { name: "Products", count: 0 },
        { name: "Registraitons", count: 0 },
      ];

    const countries = data.applicationData.countries.length;
    const products = data.applicationData.products2Application.length;
    const registrations = data.applicationData.registrations.length;

    return [
      { name: "Basic Details", count: 0 },
      { name: "Countries", count: countries },
      { name: "Products", count: products },
      { name: "Registraitons", count: registrations },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen-minus-navbar-topbar">
        <SideNav.Skeleton />
        <div className="flex flex-col w-full px-6">
          <BasicDetailsForm.Skeleton />
          <div className="border-b-[1px] mt-4"></div>
          <Section.Skeleton />
          <Section.Skeleton />
          <Section.Skeleton />
          <Section.Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen-minus-navbar-topbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6 overflow-scroll">
        {data && (
          <>
            {/* RECORD ACTIONS WIZARD */}
            <RecordActions data={data.applicationData} />
            {/* BASIC */}
            <Section
              name="Basic Details"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <BasicDetailsForm data={data.applicationData} type="edit" />
            </Section>

            {/* COUNTRIES */}
            <Section
              name="Countries"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => addCountry()}
              >
                Add Country
              </Button>
              <DataTable
                columns={applicationCountryColumns}
                data={data.applicationData.countries}
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
            <Section
              name="Products"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => addProduct()}
              >
                Add Product
              </Button>
              <DataTable
                columns={applicationProductColumns}
                data={data.applicationData.products2Application}
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
            <Section
              name="Registrations"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <DataTable
                columns={applicationRegistrationColumns}
                data={data.applicationData.registrations}
              />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
