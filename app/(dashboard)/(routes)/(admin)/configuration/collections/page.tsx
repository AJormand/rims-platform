"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { builtInCollections } from "@/constants/builtInCollections";
import { fetchCollections } from "@/app/services/api-client/api-client";

export default function Configurations() {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  const createNewCollection = async () => {
    if (!newCollectionName) {
      throw new Error("Collection name is required");
    }

    const schemaDefinition = `
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  name     String @unique
  status   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt`;

    console.log("CREATE COLLECTION FE");
    try {
      const response = await axios.post("/api/collections", {
        collectionName: newCollectionName,
        schemaDefinition: schemaDefinition,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    const data = await fetchCollections();
    setCollections(data);
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
        Create New List
      </Button>
      <Button variant={"outline"} onClick={getCollections}>
        Get Collections
      </Button>

      <div className="mt-5">
        {collections.map((collection: any) => (
          <div className="flex max-w-sm justify-between">
            <div key={collection}>{collection}</div>
            <div>
              <Button
                variant={"outline"}
                disabled={builtInCollections.includes(collection)}
                onClick={() => deleteCollection(collection)}
              >
                Delete
              </Button>
              <Button variant={"outline"}>
                <Link href={`/configuration/collections/${collection}`}>
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
