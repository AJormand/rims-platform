import { ChevronDown } from "lucide-react";

export const SideNav = () => {
  return (
    <div className="flex flex-col w-[200px] border-r p-4 gap-1 text-sm underline">
      <a href="#Basic Details" className="flex">
        Basic Details <ChevronDown size={"14"} />
      </a>
      <a href="#Applications" className="flex">
        Applications <ChevronDown size={"14"} />
      </a>
      <a href="#Registrations" className="flex">
        Registrations <ChevronDown size={"14"} />
      </a>
    </div>
  );
};
