import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

export const getDatabase = async () => {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();

  return client.db('zachs-db');
};
