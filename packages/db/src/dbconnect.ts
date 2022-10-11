import mongoose from "mongoose";
import { Err, errAsync, okAsync, ResultAsync } from "neverthrow";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

class DBConnError extends Error {}

const connectMongo = (): ResultAsync<null, DBConnError> => {
  try {
    mongoose.connect(MONGODB_URI);
    return okAsync(null);
  } catch {
    return errAsync(new DBConnError("Could not connect to database"));
  }
};

export { connectMongo };
