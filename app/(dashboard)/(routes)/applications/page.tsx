import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/application-columns";

export default async function Applications() {
  const userId = auth();

  if (!userId) return redirect("/");

  const data = await db.application.findMany();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        createRoute="/applications/create"
      />
    </div>
  );
}
