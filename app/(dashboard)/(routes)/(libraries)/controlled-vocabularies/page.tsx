"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";

export default function ControlledVocabularies() {
  const { data, isError, isLoading } = useFetchControlledVocabularies();

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
          createRoute="/controlled-vocabularies/create"
        />
      )}
    </div>
  );
}
