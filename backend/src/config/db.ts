import { MongoClient, Db } from 'mongodb';

const url = process.env.MONGO_URL;
const client = new MongoClient(url as string);
const dbName = 'eCom';

let db: Db;

export async function connectToDatabase() {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
    return db;
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}