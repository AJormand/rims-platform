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
import { StatusBar } from "@/components/status-bar";

import { useFetchApplication } from "@/app/services/hooks/hooks";
import { editApplication } from "@/app/services/api-client/api-client";

import { Minimize2, Maximize2 } from "lucide-react";

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

  console.log({ data });

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

  const handleSideNavClick = (name: string) => {
    setExpandedSectionsLocalStorage((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const expandAllSidenavSections = () => {
    setExpandedSectionsLocalStorage({
      "Basic Details": true,
      Countries: true,
      Products: true,
      Registrations: true,
    });
  };

  const collapseAllSidenavSections = () => {
    setExpandedSectionsLocalStorage({});
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
      <SideNav sections={sideNavSections} onClick={handleSideNavClick} />
      {isError && <div>Error</div>}
      {data && (
        <div className="w-full px-6 overflow-scroll">
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50">
            <StatusBar
              data={data.applicationData}
              cvName={"product-status"}
              editApiFunction={editApplication}
            />

            <div className="flex ml-auto gap-1 text-slate-500">
              <button
                className="border p-1 rounded-md hover:bg-slate-100"
                onClick={collapseAllSidenavSections}
              >
                <Minimize2 size={15} />
              </button>
              <button
                className="border p-1 rounded-md hover:bg-slate-100"
                onClick={expandAllSidenavSections}
              >
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
          {/* RECORD ACTIONS WIZARD */}
          <RecordActions data={data.applicationData} />
          {/* BASIC */}
          <Section
            name="Basic Details"
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Basic Details"]}
          >
            <BasicDetailsForm data={data.applicationData} type="edit" />
          </Section>

          {/* COUNTRIES */}
          <Section
            name="Countries"
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Countries"]}
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
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Products"]}
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
            onClick={handleSectionClick}
            isExpanded={expandedSectionsLocalStorage["Registrations"]}
          >
            <DataTable
              columns={applicationRegistrationColumns}
              data={data.applicationData.registrations}
            />
          </Section>
        </div>
      )}
    </div>
  );
}
