"use client";
import { columns } from "./_components/application-columns";

import { useFetchApplications } from "@/app/services/hooks/hooks";

import { DataTable } from "@/components/ui/data-table";

export default function Applications() {
  const { data, isError, isLoading } = useFetchApplications();

  return (
    <div className="container mx-auto py-10">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          createRoute="/applications/create"
        />
      )}
    </div>
  );
}
