"use client";

import { columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";

import { useFetchSubstances } from "@/app/(dashboard)/(routes)/(libraries)/substances/hooks/useFetchSubstances";

import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Substances() {
  
  const fetchSubstances = async () => {
    const { data } = await axios.get("/api/substances");
    console.log(data);
    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["substances"],
    queryFn: fetchSubstances,
  });

 //const { data, isError, isLoading } = useFetchSubstances();


  console.log(data);
  const queryClient = new QueryClient();
  

  return (
    <div className="container mx-auto py-10">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          createRoute="/substances/create"
        />
      )}
    </div>
  );
}
