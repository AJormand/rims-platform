import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Product, columns } from "./_components/columns";
import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.

  return [
    {
      id: "PRD-0001",
      name: "Tacrolimus_tablets_5mg_Inhouse",
      type: "Simple",
      category: "Pharmaceutical",
      origin: "inhouse",
      status: "valid",
    },
    {
      id: "PRD-0001",
      name: "Tacrolimus_tablets_10mg_Inhouse",
      type: "Simple",
      category: "Pharmaceutical",
      origin: "inhouse",
      status: "valid",
    },
    {
      id: "PRD-0001",
      name: "Tacrolimus_tablets_20mg_Inhouse",
      type: "Simple",
      category: "Pharmaceutical",
      origin: "inhouse",
      status: "valid",
    },
    // ...
  ];
}

export default async function Products() {
  //const data = await getData();

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
