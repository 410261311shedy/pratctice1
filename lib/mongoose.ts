//Establish a MongoBD and Mongoose connection
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
   throw new Error("MONGODB_URI is not define");
}

//server actions don't really remember abt the previous server action call
//that was made. So we need to "cache" the connoection
//which will allow us to simply connect to it on every server action call

interface MongooseCaches {
   conn: Mongoose | null;
   promise: Promise<Mongoose> | null;
}

//allow us to declare the connection once and maintains that single instance of the connection
declare global {
   var mongoose: MongooseCaches;
}

//define  cached variables
let cached = global.mongoose;

//prevente to create too much database connection, which leads to resource exhaustion
if (!cached) {
   cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
   if (cached.conn) {
      return cached.conn;
   }

   if (!cached.promise) {
      cached.promise = mongoose
         .connect(MONGODB_URI, { dbName: "devflow" })
         .then((result) => {
            console.log("Connected to MongoDB");
            return result;
         })
         .catch((error) => {
            console.error("Error connecting to MongoDb", error);
            throw error;
         });
   }
   cached.conn = await cached.promise;

   return cached.conn;
};

export default dbConnect;
