import { MongoClient } from "mongodb"

declare global {
  // Ensures the global variable is typed correctly in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "db_wincoe"

if (!uri) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local")
}

const options = {}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve value across module reloads
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise!
} else {
  // In production, avoid using global
  const client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
export { dbName }
