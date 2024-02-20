import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/app/services/api-client/api-client";

export const usefetchProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(productId),
  });
};
