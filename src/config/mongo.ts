import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
const MODE=process.env.NEXT_PUBLIC_ENVIROMENT as string;
const DATABSENAME = MODE=="production"?'db_wincoe':'db_wincoe_local';
if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI not defined in .env');
}

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DATABSENAME,
    });
    isConnected = true;
    console.log(`✅ MongoDB connected  & running in ${MODE},${DATABSENAME}`);
  } catch (err) {
    console.error('❌ MongoDB connection error', err);
    throw err;
  }
};
