"use client";

import { useState, useEffect } from "react";

import { fetchOrganization } from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";

import type { Organization } from "@prisma/client";

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

  const sideNavSections = [{ name: "Basic Details", count: 0 }];

  return (
    <div className="flex w-full h-[80vh] ">
      <SideNav sections={sideNavSections} />
      {organizationData && (
        <div className="w-full px-6 overflow-scroll">
          <Section name="Basic Details" isExpanded={true}>
            <BasicDetailsForm data={organizationData} type="edit" />
          </Section>
        </div>
      )}
    </div>
  );
}
