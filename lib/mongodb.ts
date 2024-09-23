import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URI; // Replace with your MongoDB connection string
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client = null;
let cachedDb = null;

export async function connectToDatabase() {
  // Check if the database connection is already cached
  if (cachedDb) {
    return cachedDb;
  }

  // Initialize the MongoClient if it doesn't exist
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Ensure that the client is connected
  if (!client.isConnected) {
    await client.connect();
  }

  // Cache the database connection and return it
  cachedDb = client.db("rims-platform"); // Replace 'rims-platform' with your actual database name
  return cachedDb;
}

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
