"use client";

import { useState, useEffect } from "react";

import { fetchOrganization } from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";

import { Organization } from "@prisma/client";

export default function Organization({
  params,
}: {
  params: { organizationId: string };
}) {
  const [organizationData, setOrganizationData] = useState<Organization>();

  const fetchData = async () => {
    const data = await fetchOrganization(params.organizationId);
    setOrganizationData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {organizationData && (
        <Section name="Basic Details" expanded={true}>
          <BasicDetailsForm data={organizationData} type="edit" />
        </Section>
      )}
    </div>
  );
}
