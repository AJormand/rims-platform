"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { builtInCollections } from "@/constants/builtInCollections";
import { fetchCustomObjectTemplates } from "@/app/services/api-client/api-client";

export default function Configurations() {
  const [customObjectsTemplates, setCustomObjectsTemplates] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  const createNewCollection = async () => {
    if (!newCollectionName) {
      throw new Error("Collection name is required");
    }

    try {
      const response = await axios.post("/api/custom-objects-templates", {
        name: newCollectionName,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomObjectsTemplates();
  }, []);

  const getCustomObjectsTemplates = async () => {
    const data = await fetchCustomObjectTemplates();
    setCustomObjectsTemplates(data);
  };

  const deleteCollection = async (collectionName: string) => {
    try {
      const response = await axios.delete("/api/collections", {
        data: { collectionName },
      });
      console.log(response);
      if (response.status === 200) {
        getCollections();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <input
        className="p-1"
        placeholder="Collection name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <Button variant={"outline"} onClick={createNewCollection}>
        Create Custom Object Template
      </Button>
      <Button variant={"outline"} onClick={getCustomObjectsTemplates}>
        Get Custom Object Templates
      </Button>

      <div className="mt-5">
        {customObjectsTemplates.map((customObjectsTemplate: any) => (
          <div className="flex max-w-sm justify-between">
            <div key={customObjectsTemplate.name}>{customObjectsTemplate.name}</div>
            <div>
              <Button
                variant={"outline"}
                disabled={builtInCollections.includes(customObjectsTemplate.name)}
                onClick={() => deleteCollection(customObjectsTemplate)}
              >
                Delete
              </Button>
              <Button variant={"outline"}>
                <Link href={`/configuration/custom-objects-templates/${customObjectsTemplate.name}`}>
                  Edit
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
