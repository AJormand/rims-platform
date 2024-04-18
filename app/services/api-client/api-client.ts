import axios from "axios";
import { Product2Substance, Substance, Application } from "@prisma/client";
import toast from "react-hot-toast";

// PRODUCT

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

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

export const editProduct = async (productId: string, values: any) => {
  try {
    console.log(values);
    const response = await axios.put(`/api/products/${productId}`, {
      values,
    });
    console.log(response);
    toast.success("Product updated successfully");
    return response;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

//APPLICATION

export const fetchApplications = async () => {
  try {
    const { data } = await axios.get("/api/applications");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchApplication = async (applicationId: string) => {
  try {
    const { data } = await axios.get(`/api/applications/${applicationId}`);
    const productsArr = data?.products2Application?.map(
      (item: any) => item.product
    );

    return { applicationData: data, applicationProducts: productsArr };
  } catch (error) {
    console.error(error);
    toast.error(`"${error}`);
  }
};

export const editApplication = async (applicationId: string, values: any) => {
  try {
    console.log("editApplication");
    console.log(values);
    const response = await axios.put(`/api/applications/${applicationId}`, {
      values,
    });
    console.log(response);
    toast.success("Applicaiton updated successfully");
    return response;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

// REGISTRATION
type PartialRegistration = {
  name: string;
  country: string;
  status: string;
  applicationId: string;
  productId: string;
};

export const fetchRegistrations = async () => {
  try {
    const { data } = await axios.get("/api/registrations");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchRegistrationsForProduct = async (productId: string) => {
  try {
    const { data } = await axios.get(`/api/registrations/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

interface ProductSubstance extends Product2Substance {
  substance: Substance;
}

// export const fetchRegistration = async (registrationId: string) => {
//   try {
//     const { data } = await axios.get(`/api/registrations/${registrationId}`);

//     const activeSubstances = data.productSubstances.filter(
//       (productSubstance: ProductSubstance) =>
//         productSubstance.substance.type === "Active Substance"
//     );

//     const inactiveSubstances = data.productSubstances.filter(
//       (productSubstance: ProductSubstance) =>
//         productSubstance.substance.type !== "Active Substance"
//     );

//     const applications = data.productApplications.map(
//       (item: any) => item.application
//     );

//     return {
//       data,
//       activeSubstances,
//       inactiveSubstances,
//       applications,
//     };
//   } catch (error) {
//     console.log(error);
//     return {};
//   }
// };

// export const editRegistration = async (productId: string, values: any) => {
//   try {
//     console.log(values);
//     const response = await axios.put(`/api/products/${productId}`, {
//       values,
//     });
//     console.log(response);
//     //router.push(`/products/`);
//     toast.success("Product updated successfully");
//     return response;
//   } catch (error) {
//     toast.error("Something went wrong");
//   }
// };

export const createRegistrations = async (data: PartialRegistration[]) => {
  try {
    const response = await axios.post("/api/registrations", data);
    console.log(response.data);
    toast.success("Registrations created successfully");
  } catch (error) {
    toast.error("Something went wrong");
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
    const { data } = await axios.get("/api/countries");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchCountry = async (countryId: string) => {
  try {
    const { data } = await axios.get(`/api/countries/${countryId}`);
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

// CONTROLLED VOCABULARY

export const fetchControlledVocabularies = async () => {
  try {
    const { data } = await axios.get("/api/controlled-vocabularies");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchControlledVocabulary = async (
  controlledVocabularyId: string
) => {
  try {
    const { data } = await axios.get(
      `/api/controlled-vocabularies/${controlledVocabularyId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const deleteControlledVocabulary = async (
  controlledVocabularyId: string
) => {
  try {
    await axios.delete("/api/controlled-vocabularies", {
      data: { controlledVocabularyId },
    });
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
