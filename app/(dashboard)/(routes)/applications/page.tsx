"use client";
import { columns } from "./_components/application-columns";

import { useFetchApplications } from "@/app/services/hooks/hooks";

import { DataTable } from "@/components/ui/data-table";

export default function Applications() {
  const { data, isError, isLoading } = useFetchApplications();

  if (isLoading)
    return (
      <div className="container mx-auto py-10">
        <DataTable.skeleton />
      </div>
    );

  return (
    <div className="container mx-auto py-10">
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
