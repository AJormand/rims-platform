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
    const { data } = await axios.get(
      `/api/registrations/products/${productId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

interface ProductSubstance extends Product2Substance {
  substance: Substance;
}

export const fetchRegistration = async (registrationId: string) => {
  try {
    console.log("fetching registration", registrationId);
    const { data } = await axios.get(`/api/registrations/${registrationId}`);

    console.log("registration test", data);

    return {
      data,
    };
  } catch (error) {
    console.log(error);
    toast.error(`"${error}`);
  }
};

export const editRegistration = async (registrationId: string, values: any) => {
  try {
    console.log(values);
    const response = await axios.put(`/api/registrations/${registrationId}`, {
      values,
    });
    console.log(response);
    toast.success("registration updated successfully");
    return response;
  } catch (error) {
    toast.error("Something went wrong");
  }
};

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

export const editSubstance = async (substanceId: string, values: any) => {
  try {
    console.log("editSubstance");
    console.log(values);
    const response = await axios.put(`/api/substances/${substanceId}`, {
      values,
    });
    console.log(response);
    toast.success("Substance updated successfully");
    return response;
  } catch (error) {
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

export const editOrganization = async (organizationId: string, values: any) => {
  try {
    console.log("editOrganization");
    console.log(values);
    const response = await axios.put(`/api/organizations/${organizationId}`, {
      values,
    });
    console.log(response);
    toast.success("Organization updated successfully");
    return response;
  } catch (error) {
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

export const editCountry = async (countryId: string, values: any) => {
  try {
    console.log("editCountry");
    console.log(values);
    const response = await axios.put(`/api/countries/${countryId}`, {
      values,
    });
    console.log(response);
    toast.success("Country updated successfully");
    return response;
  } catch (error) {
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

export const editControlledVocabulary = async (
  controlledVocabularyId: string,
  values: any
) => {
  try {
    console.log("editControlledVocabulary");
    console.log(values);
    const response = await axios.put(
      `/api/controlled-vocabularies/${controlledVocabularyId}`,
      {
        values,
      }
    );
    console.log(response);
    toast.success("ControlledVocabulary updated successfully");
    return response;
  } catch (error) {
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

// CUSTOM OBJECT
export const fetchCustomObjects = async (customObjectName: string) => {
  try {
    const { data } = await axios.get(`/api/custom-objects/${customObjectName}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchCustomObject = async (
  customObjectName: string,
  customObjectId: string
) => {
  try {
    const { data } = await axios.get(
      `/api/custom-objects/${customObjectName}/${customObjectId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const fetchColumnNames = async (customObjectName: string) => {
  console.log("fetching data");
  try {
    const response = await axios.get(`/api/collections/${customObjectName}`);
    const collectionData = await response.data;

    // Extract model from Prisma schema
    const modelRegex = new RegExp(
      `model ${customObjectName} \\{([^\\}]*)\\}`,
      "s"
    );
    const match = response.data.match(modelRegex);

    // Extract fields from model
    if (match) {
      const modelBody = match[1].trim();
      const fields = modelBody
        .split("\n")
        .map((field: string) => field.trim())
        .filter((field: string) => field.length > 0);

      const parsedFields = fields.map((field: string) => {
        const fieldComponents = field.split(/\s+/);
        return fieldComponents;
      });

      //prisma schema returns fields in 3 columns but since we only need the names take the first column
      const fieldNames = parsedFields.map((field: string[]) => field[0]);
      console.log(fieldNames);

      return fieldNames;
    }
  } catch (error) {
    console.error("Failed to fetch collection data:", error);
  }
};

export const editCustomObjectData = async (
  id: string,
  customObjectName: string,
  values: any
) => {
  try {
    console.log("editCustomObjectData");
    console.log(values);
    const response = await axios.put(
      `/api/custom-objects/${customObjectName}/${id}`,
      {
        values,
      }
    );
    console.log(response);
    toast.success("CustomObjectData updated successfully");
    return response;
  } catch (error) {
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

// COLLECTIONS
export const fetchCollections = async () => {
  try {
    const response = await axios.get("/api/collections");
    const responseCollections = response.data.cursor.firstBatch;
    const collectionNames = responseCollections.map(
      (collection: any) => collection.name
    );
    console.log(collectionNames);
    return collectionNames;
  } catch (error) {
    toast.error(`"${error}`);
  }
};
