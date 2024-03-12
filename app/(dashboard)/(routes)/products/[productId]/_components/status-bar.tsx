"use client";
import { useState } from "react";
import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";
import { string } from "zod";

export const StatusBar = ({ data, cv }: { data: any; cv: string }) => {
  const { data: controlledVocabularies } = useFetchControlledVocabularies();
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);

  const statusValues = controlledVocabularies?.filter(
    (element: any) => element.name === cv
  );

  return (
    <div className="flex items-center gap-4 my-2">
      <h1 className="font-bold text-sky-600 text">{data.name}</h1>

      <div className="relative">
        <button
          className="px-4 py-1 rounded-full bg-sky-600 text-white text-sm font-semibold"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {data.status}
        </button>
        {isOpen && (
          <>
            <ul className="absolute bg-white z-50 select-none">
              {statusValues?.map((element: any) => (
                <li
                  key={element.id}
                  className="hover:bg-slate-200 cursor-pointer px-2 py-1 rounded-sm"
                >
                  {element.value}
                </li>
              ))}
            </ul>
            <div
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};
