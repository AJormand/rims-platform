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

export const RecordActions = ({ data }: any) => {
  const handleCreateRegistrations = () => {
    console.log("Create Registrations");
    console.log(data.countries);
    console.log(data.products2Application);
    let registrationsArray = [];
    for (let i = 0; i < data.countries.length; i++) {
      for (let j = 0; j < data.products2Application.length; j++) {
        registrationsArray.push({
          country: data.countries[i].name,
          product: data.products2Application[j].product.name,
        });
      }
    }
    console.log(registrationsArray);
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
