import { MongoClient } from "mongodb"
import mongoose from 'mongoose';

const client = new MongoClient(process.env.MONGO_URI as string)

export const db = client.db()



const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}
interface CachedProps {
  conn: typeof mongoose | null,
  promise: Promise<typeof mongoose> | null
}
declare global {
  var mongoose: CachedProps | undefined
}
 let cached = global.mongoose 

 if(!cached){
  cached = {conn: null, promise: null}
 }
export const dbConnection = async()=>{
  if(cached.conn){
    console.log("💫 Previous Connection Working")
    return cached.conn;
  }
  
  
  if (!cached.promise) {
    console.log('🆕 Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  
  
  try {
     cached.conn = await cached.promise
     console.log("✅ Connection Created")
     return cached.conn;
  } catch (error) {
     console.error(error);

  }
}