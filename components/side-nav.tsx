import { ChevronDown } from "lucide-react";

export const SideNav = ({ sections }: { sections: string[] }) => {
  return (
    <div className="flex flex-col w-[200px] border-r p-4 gap-1 text-sm underline">
      <div className="flex- flex-col sticky top-5">
        {sections.map((section) => (
          <a href={`#${section}`} key={section} className="flex">
            {section} <ChevronDown size={"14"} />
          </a>
        ))}
      </div>
    </div>
  );
};
