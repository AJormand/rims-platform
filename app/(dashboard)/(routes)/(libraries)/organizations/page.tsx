"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

import { useFetchOrganizations } from "@/app/services/hooks/hooks";

export default function Organizations() {
  const { data, isError, isLoading } = useFetchOrganizations();

  return (
    <div className="container mx-auto py-10">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          createRoute="/organizations/create"
        />
      )}
    </div>
  );
}
