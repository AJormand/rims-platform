"use client";
import { useState } from "react";
import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";

import { editProduct } from "@/app/services/api-client/api-client";

export const StatusBar = ({ data, cv}: { data: any; cv: string}) => {
  const { data: controlledVocabularies } = useFetchControlledVocabularies();
  const [status, setStatus] = useState(data.status);
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);

  const statusValues = controlledVocabularies?.filter(
    (element: any) => element.name === cv
  );

  const handleStatusChange = async (status: string) => {
    console.log(status);
    const response = await editProduct(data.id, { status });
    if(response?.status === 200) {
      setStatus(status);
      setIsOpen(false);
      //invalidate product query
    }
  }

  return (
    <div className="flex items-center gap-4 my-2 pb-2 border-b-2">
      <h1 className="font-bold text-sky-600 text">{data.name}</h1>

      <div className="relative">
        <button
          className="px-4 py-1 rounded-full bg-sky-600 text-white text-sm font-semibold"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {status}
        </button>
        {isOpen && (
          <>
            <ul className="absolute bg-white z-50 select-none">
              {statusValues?.map((element: any) => (
                <li
                  key={element.id}
                  className="hover:bg-slate-200 cursor-pointer px-2 py-1 rounded-sm text-sm"
                  onClick={() => handleStatusChange(element.value)}
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
