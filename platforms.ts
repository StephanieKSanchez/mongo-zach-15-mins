import { getDb } from './db';

interface Platform {
  name: string;
}

const getCollection = async () => {
  const db = await getDb();
  return db.collection<Platform>('platforms'); // this collection is now defined by the shape of Platform
};

export const createPlatform = async (platform: Platform) => {
  const col = await getCollection();
  const insertedResults = await col.insertOne(platform);

  return insertedResults.insertedId;
};

export const getPlatforms = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};
