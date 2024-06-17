"use client";

import { useState, useEffect } from "react";

import {
  fetchOrganization,
  editOrganization,
} from "@/app/services/api-client/api-client";

import { BasicDetailsForm } from "../_components/basic-details-form";
import { Section } from "@/components/section";
import { SideNav } from "@/components/side-nav";
import { StatusBar } from "@/components/status-bar";

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
          <div className="flex border-b-2 py-2 rounded-lg bg-slate-50">
            <StatusBar
              data={organizationData}
              cvName={"product-status"}
              editApiFunction={editOrganization}
            />
          </div>
          <Section name="Basic Details" isExpanded={true}>
            <BasicDetailsForm data={organizationData} type="edit" />
          </Section>
        </div>
      )}
    </div>
  );
}
