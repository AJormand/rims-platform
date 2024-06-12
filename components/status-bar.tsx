"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchControlledVocabularies } from "@/app/services/hooks/hooks";

import { editProduct } from "@/app/services/api-client/api-client";

interface StatusBarProps {
  data: any;
  cvName: string;
  editApiFunction: (id: string, data: any) => Promise<any>;
  queryKey: string;
}

export const StatusBar = ({
  data,
  cvName,
  editApiFunction,
  queryKey,
}: StatusBarProps) => {
  const queryClient = useQueryClient();
  const { data: controlledVocabularies } = useFetchControlledVocabularies();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ xxx: data });

  const statusValues = controlledVocabularies?.filter(
    (element: any) => element.name === cvName
  );

  const handleStatusChange = async (status: string) => {
    console.log(status);
    const response = await editApiFunction(data.id, { status });
    if (response?.status === 200) {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "text-gray-400";
      case "Active":
        return "text-sky-700";
      case "Inactive":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBackgroundColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-400";
      case "Active":
        return "bg-sky-700";
      case "Inactive":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <h1 className={`font-bold ${getStatusTextColor(data.status)}`}>
        {data.name}
      </h1>

      <div className="relative">
        <button
          className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${getStatusBackgroundColor(
            data.status
          )}`}
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
