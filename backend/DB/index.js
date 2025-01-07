import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://ratneshsingh8521127312:E3zgkuhXU99kqd0I@cluster0.jhdey.mongodb.net/');
        console.log(`Database connectes ${conn.connection.host}`);
        console.log("Connection established to database...");
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;
