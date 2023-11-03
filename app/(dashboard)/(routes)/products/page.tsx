import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Product, columns } from "./_components/columns";
import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

export default async function Products() {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const data = await db.product.findMany({
    take: 10,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex">
        <Link href="/products/create" className="ml-auto">
          <Button>Create</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
