import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
    });
    console.log(
      `Database connected successfully to the server : ${connection.connection.host}`
    );
  } catch (error) {
    console.error(error);
  }
};

export default connectDatabase;
