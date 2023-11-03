import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { Section } from "@/components/section";
import { BasicDetailsForm } from "../_components/basic-details-form";

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const productData = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  return (
    <div>
      <Section
        name="Basic Details"
        component={<BasicDetailsForm data={productData} type="edit" />}
        expanded={true}
      />
      <Section name="Applications" component={<div />} expanded={false} />
      <Section name="Registrations" component={<div />} expanded={false} />
    </div>
  );
}
