import axios from "axios";
import { Product2Substance, Substance, Application } from "@prisma/client";
import toast from "react-hot-toast";

// PRODUCT

interface ProductSubstance extends Product2Substance {
  substance: Substance;
}

export const fetchProduct = async (productId: string) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    const activeSubstances = data.productSubstances.filter(
      (productSubstance: ProductSubstance) =>
        productSubstance.substance.type === "Active Substance"
    );

    const inactiveSubstances = data.productSubstances.filter(
      (productSubstance: ProductSubstance) =>
        productSubstance.substance.type !== "Active Substance"
    );

    const applications = data.productApplications.map(
      (item: any) => item.application
    );

    return {
      data,
      activeSubstances,
      inactiveSubstances,
      applications,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

// SUBSTANCE
export const fetchSubstances = async () => {
  try {
    const { data } = await axios.get("/api/substances");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchSubstance = async (substanceId: string) => {
  try {
    const { data } = await axios.get(`/api/substances/${substanceId}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const deleteSubstance = async (substanceId: string) => {
  try {
    await axios.delete("/api/substances", { data: { substanceId } });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

// ORGANIZATION
export const fetchOrganizations = async () => {
  try {
    const { data } = await axios.get("/api/organizations");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchOrganization = async (organizationId: string) => {
  try {
    const { data } = await axios.get(`/api/organizations/${organizationId}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const deleteOrganization = async (organizationId: string) => {
  try {
    await axios.delete("/api/organizations", { data: { organizationId } });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

// COUNTRY
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get("/api/country");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchCountry = async (countryId: string) => {
  try {
    const { data } = await axios.get(`/api/country/${countryId}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const deleteCountry = async (countryId: string) => {
  try {
    await axios.delete("/api/countries", { data: { countryId } });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

// POPUP

type ObjectWithId = {
  id: string;
};

export const fetchPopUpData = async (
  url: string,
  linkedRecords: ObjectWithId[]
) => {
  try {
    const { data } = await axios.get(url);
    console.log(data);
    console.log(linkedRecords);
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
