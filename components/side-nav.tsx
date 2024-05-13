import { ChevronDown } from "lucide-react";

interface SideNavProps {
  sections: string[];
  onClick?: (name: string) => void;
}

export const SideNav = ({ sections, onClick }: SideNavProps) => {
  return (
    <div className="flex flex-col w-[200px] border-r p-4 gap-1 text-sm underline">
      <div className="flex- flex-col sticky top-5">
        {sections.map((section) => (
          <a
            href={`#${section}`}
            key={section}
            onClick={() => onClick?.(section)}
            className="flex py-1"
          >
            {section} <ChevronDown size={"14"} />
          </a>
        ))}
      </div>
    </div>
  );
};
