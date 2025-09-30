import mongoose from 'mongoose';

export async function connectDB(uri: string) {
  if (!uri) throw new Error('MONGODB_URI manquant');
  mongoose.set('strictQuery', true);
  if (process.env.NODE_ENV !== 'production') mongoose.set('debug', true);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
    connectTimeoutMS: 10_000,
    socketTimeoutMS: 20_000,
    // ne PAS mettre keepAlive ici
  });

  console.log('MongoDB connecté');
}
