import { ObjectId } from 'mongodb';
import { getDatabase } from './db';

interface TvShow {
  name: string;
  platformIds: string[]; 
  genre: string;
  maturityRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
}

const getCollection = async () => {
  const db = await getDatabase();
  return db.collection<TvShow>('tv-shows');
};

export const createTvShows = async (tvShow: TvShow) => {
  const col = await getCollection();
  const ret = await col.insertOne(tvShow);

  return ret.insertedId;
};

export const getTvShows = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};

export const getShowsByPlatform = async (platformId: ObjectId ) => {
  const col = await getCollection();
  const ret = col.find({
    platformId,
  });
  return ret.toArray();
};

export const getShowsByName = async (name: string) => {
  const col = await getCollection();
  const ret = col.find({
    name: {
      $regex: `.*${name}.*`,
    },
  });
  return ret.toArray();
};

export const getShowsByNameExactMatch = async (name: string) => {
  const col = await getCollection();
  const ret = col.find({
    name,
  });
  return ret.toArray();
};
