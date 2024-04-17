"use client";

import { IconBadge } from "@/components/icon-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GripHorizontal } from "lucide-react";

import { createRegistrations } from "@/app/services/api-client/api-client";

type PartialRegistration = {
  name: string;
  country: string;
  status: string;
  applicationId: string;
  productId: string;
};

export const RecordActions = ({ data }: any) => {
  const handleCreateRegistrations = () => {
    let registrationsArray: PartialRegistration[] = [];
    for (let i = 0; i < data.countries.length; i++) {
      for (let j = 0; j < data.products2Application.length; j++) {
        registrationsArray.push({
          name:
            data.countries[i].name +
            " - " +
            data.products2Application[j].product.name,
          country: data.countries[i].name,
          productId: data.products2Application[j].product.id,
          status: "Draft",
          applicationId: data.id,
        });
      }
    }
    // filters out registrations that already exist
    let missingRegistrations = registrationsArray.filter(
      (registration) =>
        !data.registrations.some((item: any) => item.name === registration.name)
    );

    createRegistrations(missingRegistrations);
  };

  return (
    <div className="outline-none flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconBadge icon={GripHorizontal} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Wizard</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleCreateRegistrations()}>
            Create Registrations
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
