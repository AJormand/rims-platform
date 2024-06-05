import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProduct,
  fetchApplications,
  fetchApplication,
  fetchRegistrations,
  fetchRegistrationsForProduct,
  fetchRegistration,
  fetchSubstances,
  deleteSubstance,
  fetchOrganizations,
  deleteOrganization,
  fetchCountries,
  deleteCountry,
  fetchControlledVocabularies,
  deleteControlledVocabulary,
} from "@/app/services/api-client/api-client";
import toast from "react-hot-toast";

//PRODUCT
export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });
};

export const usefetchProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const [productData, registrationsData] = await Promise.all([
        fetchProduct(productId),
        fetchRegistrationsForProduct(productId),
      ]);
      return {
        productData: productData,
        registrationsData: registrationsData,
      };
    },
  });
};

//APPLICATION
export const useFetchApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications(),
  });
};

export const useFetchApplication = (applicaitonId: string) => {
  return useQuery({
    queryKey: ["application", applicaitonId],
    queryFn: () => fetchApplication(applicaitonId),
  });
};

//REGISTRATION
export const useFetchRegistrations = () => {
  return useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchRegistrations(),
  });
};

export const useFetchRegistration = (registrationId: string) => {
  return useQuery({
    queryKey: ["registration", registrationId],
    queryFn: () => fetchRegistration(registrationId),
  });
};

//SUBSTANCE
export const useFetchSubstances = () => {
  return useQuery({
    queryKey: ["substances"],
    queryFn: () => fetchSubstances(),
  });
};

export const useDeleteSubstance = (substanceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSubstance(substanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["substances"] });
      toast.success("Substance deleted");
    },
    onError: (err: any) => {
      toast.error("Substance not deleted");
    },
  });
};

//trying to implement loader when deleting substances

//ORGANIZATION
export const useFetchOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => fetchOrganizations(),
  });
};

export const useDeleteOrganization = (organizationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteOrganization(organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organization deleted");
    },
    onError: (err: any) => {
      toast.error("Organization not deleted");
    },
  });
};

//COUNTRY
export const useFetchCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchCountries(),
  });
};

export const useDeleteCountry = (countryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCountry(countryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      toast.success("Country deleted");
    },
    onError: (err: any) => {
      toast.error("Country not deleted");
    },
  });
};

// CONTROLLED VOCABULARY
export const useFetchControlledVocabularies = () => {
  return useQuery({
    queryKey: ["controlledVocabularies"],
    queryFn: () => fetchControlledVocabularies(),
    staleTime: Infinity, // Set to Infinity to fetch data only once and call it from cache in other calls
  });
};

export const useDeleteControlledVocabulary = (
  controlledVocabularyId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteControlledVocabulary(controlledVocabularyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["controlledVocabularies"] });
      toast.success("Controlled Vocabulary deleted");
    },
    onError: (err: any) => {
      toast.error("Controlled Vocabulary not deleted");
    },
  });
};
