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
  product: string;
  status: string;
  applicationId: string;
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
          product: data.products2Application[j].product.name,
          status: "Draft",
          applicationId: data.id,
        });
      }
    }
    console.log(registrationsArray);
    createRegistrations(registrationsArray);
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
