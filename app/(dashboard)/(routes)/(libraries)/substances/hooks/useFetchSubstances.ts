import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSubstances = async () => {
  const { data } = await axios.get("/api/substances");
  return data;
};

export const useFetchSubstances = () => {
  return useQuery({
    queryKey: ["substances"],
    queryFn: fetchSubstances,
  });
};
