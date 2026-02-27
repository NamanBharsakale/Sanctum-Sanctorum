import { MongoClient } from 'mongodb';

const uri = process.env.REACT_APP_MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.REACT_APP_MONGODB_DB || 'sanctumInfinitum';

let client;
let db;

export async function connectToMongo() {
  if (db) return db;
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function getPdfCollection() {
  const database = await connectToMongo();
  return database.collection('pdfEntries');
}
