"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Application } from "@prisma/client";

export default function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const [application, setApplication] = useState<Application>();

  const fetchApplication = async () => {
    try {
      const response = await axios.get(
        `/api/applications/${params.applicationId}`
      );
      setApplication(response.data);
    } catch (error) {
      toast.error(`"${error}`);
    }
  };

  return <div>Application</div>;
}
