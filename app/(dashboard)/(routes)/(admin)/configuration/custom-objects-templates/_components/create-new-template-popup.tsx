import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const CreateNewTemplatePopup = ({
  setCreateNewPopupVisisble,
}: {
  setCreateNewPopupVisisble: any;
}) => {
  const [templateName, setTemplateName] = useState("");
  const createNewTemplate = async () => {
    try {
      const response = await axios.post("/api/custom-objects-templates", {
        name: templateName,
        status: "Draft",
        createdAt: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="left-0 right-0 top-0 bottom-0 flex items-center justify-center absolute">
      {/* screen blocker */}
      <div className="left-0 right-0 top-0 bottom-0 absolute bg-slate-300 opacity-60 z-40" />
      {/* container */}
      <div className="z-50 bg-white rounded-md shadow-sm flex flex-col">
        <button
          className="ml-auto hover:bg-slate-100 px-4 py-3 rounded-md"
          onClick={() => setCreateNewPopupVisisble(false)}
        >
          X
        </button>
        <form className="flex flex-col items-center w-[600px] px-5 pb-5">
          <div className="flex flex-col w-full">
            <h1 className="ml-auto w-full mb-2 text-sm">
              Create New Custom Object Template
            </h1>
            <input
              placeholder="Name"
              defaultValue={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full p-3 border-2 border-slate-200 rounded-md"
            />
          </div>

          <Button
            variant={"outline"}
            className="mt-2"
            onClick={createNewTemplate}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
