import { useEffect, useState } from "react";

import axios from "axios";

import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

export const AddRecordPopup = ({
  name,
  setPopVisible,
  fetchDataRoute,
  storeDataRoute,
  columns,
}: {
  name: string;
  setPopVisible: (value: boolean) => void;
  fetchDataRoute: string;
  storeDataRoute: string;
  columns: any; //shadcnui columns component passed in as required for the data table component
}) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(fetchDataRoute);
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
            <h1>{`Select ${name} to be linked`}</h1>
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
            storeDataRoute={storeDataRoute}
          />
        </div>
      </div>
    </div>
  );
};
