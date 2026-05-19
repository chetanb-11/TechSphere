import { MongoClient, Db } from 'mongodb';

const dbName = 'eCom';
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
    if (db) return db;

    const url = process.env.MONGO_URL;
    if (!url) {
        throw new Error('MONGO_URL environment variable is not defined.');
    }

    client = new MongoClient(url);
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