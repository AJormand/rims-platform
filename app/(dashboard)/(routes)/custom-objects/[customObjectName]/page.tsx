"use client";

import { columns } from "../_components/columns";
import { DataTable } from "@/components/ui/data-table";

import { useFetchCustomObjects } from "@/app/services/hooks/hooks";

export default function CustomObjects({
  params,
}: {
  params: { customObjectName: string };
}) {
  const { customObjectName } = params;

  const { data, isError, isLoading } = useFetchCustomObjects(customObjectName);

  if (isLoading)
    return (
      <div className="container mx-auto py-10">
        <DataTable.skeleton />
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <h1>CUSTOM</h1>
      {isError && <div>Error</div>}
      {data && (
        <DataTable
          columns={columns}
          data={data}
          createRoute={`/custom-objects/${customObjectName}/create`}
        />
      )}
    </div>
  );
}
