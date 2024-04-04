"use client";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";
import { cva } from "class-variance-authority";

import { editProduct } from "@/app/services/api-client/api-client";



export const StatusBar = ({ data, cv}: { data: any; cv: string}) => {
  const queryClient = useQueryClient();
  const { data: controlledVocabularies } = useFetchControlledVocabularies();
  const [isOpen, setIsOpen] = useState(false);

  const statusValues = controlledVocabularies?.filter(
    (element: any) => element.name === cv
  );

  const handleStatusChange = async (status: string) => {
    console.log(status);
    const response = await editProduct(data.id, { status });
    if(response?.status === 200) {
      setIsOpen(false);
      queryClient.invalidateQueries({queryKey: ["product"]});
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "orange-500";
      case "Active":
        return "sky-700";
      case "Inactive":
        return "red-500";
      default:
        return "gray-400";
    }}

  return (
    <div className={`flex items-center gap-4 my-2 pb-2 border-b-2 border-${getStatusColor(data.status)}`}>
      <h1 className={`font-bold text-${getStatusColor(data.status)}`}>{data.name}</h1>
      <div className="relative">
        <button
          className={`px-4 py-1 rounded-full text-white text-sm font-semibold bg-${getStatusColor(data.status)}`}
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
