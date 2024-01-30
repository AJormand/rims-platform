import { auth } from "@clerk/nextjs";

import { columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function Substances() {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const data = await db.substance.findMany({
    take: 10,
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        createRoute="/substances/create"
      />
    </div>
  );
}
