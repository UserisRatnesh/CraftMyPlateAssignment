import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        const conn = await mongoose.connect(uri);
        console.log(`Database connectes ${conn.connection.host}`);
        console.log("Connection established to database...");
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;
