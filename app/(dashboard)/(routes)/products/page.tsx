"use client";
import { columns } from "./_components/columns";

import { useFetchProducts } from "@/app/services/hooks/hooks";

import { DataTable } from "@/components/ui/data-table";

export default function Products() {
  const { data, isError, isLoading } = useFetchProducts();

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
          createRoute="/products/create"
        />
      )}
    </div>
  );
}
