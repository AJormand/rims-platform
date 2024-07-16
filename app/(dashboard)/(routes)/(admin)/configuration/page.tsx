"use client";

import { useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";

export default function Configurations() {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");

  const createNewCollection = async () => {

    const schemaDefinition = `
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  name     String @unique
  status   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt`;

    console.log("CREATE COLLECTION FE");
    try {
      const response = await axios.post("/api/create-collection", {
        collectionName: newCollectionName,
        schemaDefinition: schemaDefinition,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollections = async () => {
    console.log("GET COLLECTIONS FE");
    try {
      const response = await axios.get("/api/create-collection");
      console.log(response);
      const responseCollections = response.data.cursor.firstBatch;
      console.log({ collections });
      const collectionNames = responseCollections.map(
        (collection: any) => collection.name
      );
      console.log(collectionNames);
      setCollections(collectionNames);
    } catch (error) {
      console.log(error);
    }
  };

  //Built in collections can't be deleted
  const builtInCollections = [
    "Product2Organization",
    "Product2Application",
    "Application",
    "ProductApplication",
    "Product2Substance",
    "ControlledVocabulary",
    "Substance",
    "Product",
    "Country",
    "Submission",
    "Organization",
    "Registration",
    "CVLibrary"
  ]
  

  const deleteCollection = async (collectionName:string) => {
    try {
      const response = await axios.delete("/api/create-collection",{data: {collectionName}})
      console.log(response)
      if(response.status === 200){
        getCollections()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Button variant={"outline"} onClick={createNewCollection}>
        Create New List
      </Button>
      <input
        placeholder="Collection name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <Button variant={"outline"} onClick={getCollections}>
        Get Collections
      </Button>



      


      <div>
        {collections.map((collection: any) => (
          <div className="flex w-32">
            <div key={collection}>{collection}</div>
            <Button variant={"outline"} disabled={builtInCollections.includes(collection)} onClick={() => deleteCollection(collection)}>Delete</Button>
          </div>
     
        ))}
      </div>
    </div>
  );
}
