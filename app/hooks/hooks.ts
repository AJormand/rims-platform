import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product2Substance, Substance, Application } from "@prisma/client";

interface ProductSubstance extends Product2Substance {
  substance: Substance;
}

const fetchProduct = async (productId: string) => {
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

export const usefetchProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(productId),
  });
};
