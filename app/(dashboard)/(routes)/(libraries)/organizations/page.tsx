import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

export default async function Organizations() {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const data = await db.organization.findMany({
    take: 10,
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        createRoute="/organizations/create"
      />
    </div>
  );
}
