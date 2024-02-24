import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, fetchSubstances, deleteSubstance } from "@/app/services/api-client/api-client";
import toast from "react-hot-toast";

//PRODUCT
export const usefetchProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(productId),
  });
};


//SUBSTANCE
export const useFetchSubstances = () => {
  return useQuery({
    queryKey: ["substances"],
    queryFn: () => fetchSubstances(),
  });
}

export const useSubstanceDeleteMutation = (substanceId: string) => {
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
}

//trying to implement loader when deleting substances