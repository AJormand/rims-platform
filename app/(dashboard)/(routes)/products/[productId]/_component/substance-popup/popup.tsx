import { useEffect, useState } from "react";

import axios from "axios";
import { db } from "@/lib/db";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";

export const AddSubstancePopup = ({
  setPopVisible,
}: {
  setPopVisible: (value: boolean) => void;
}) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/products");
    setData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50">
      <div className="absolute w-full h-full bg-slate-300 opacity-60 " />
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="border rounded-lg bg-white p-10">
          <div className="flex justify-between">
            <h1>Select Products to be linked with Application</h1>
            <Button
              onClick={() => {
                setPopVisible(false);
              }}
              variant={"ghost"}
              className="bold"
            >
              X
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={data}
            createRoute="/products/create"
            setPopVisible={setPopVisible}
          />
        </div>
      </div>
    </div>
  );
};
