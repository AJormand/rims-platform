"use client";
import { useState } from "react";
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
  const {
    data: application,
    isError,
    isLoading,
  } = useFetchApplication(params.applicationId);

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
      application?.applicationProducts
    );
    setPopUpData(response);
  };

  const addCountry = async () => {
    setAddRecordPopupVisible("country");
    const data = await fetchPopUpData(
      `/api/countries`,
      application?.applicationData.countries || []
    );
    setPopUpData(data);
  };

  const sideNavSections = ["Basic Details", "Products"];

  return (
    <div className="flex w-full h-screen-minus-navbar">
      <SideNav sections={sideNavSections} />
      <div className="w-full px-6">
        {application && (
          <>
            {/* RECORD ACTIONS WIZARD */}
            <RecordActions data={application.applicationData} />
            {/* BASIC */}
            <Section
              name="Basic Details"
              expandedSections={expandedSectionsLocalStorage}
              onClick={handleSectionClick}
            >
              <BasicDetailsForm
                data={application.applicationData}
                type="edit"
              />
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
                data={application.applicationData.countries}
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
                data={application.applicationData.products2Application}
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
                data={application.applicationData.registrations}
              />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
