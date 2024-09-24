import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI; // Replace with your MongoDB connection string
let options = {};

if (!URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

console.log(URI);

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;

/*
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI; // Ensure this is defined in your environment variables

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(uri);

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return client;
  }

  try {
    await client.connect();
    isConnected = true;
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

export const getDb = () => {
  if (!isConnected) {
    throw new Error("Database not connected");
  }
  return client.db("rims-platform"); // Replace with your database name
};

/*
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;
*/
