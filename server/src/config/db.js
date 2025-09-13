import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const URI = process.env.MONGODB_URI;
    if(!URI){
        console.error("MongoDB Uri missing in env");
        process.exit(1);
    }
    try{
        await mongoose.connect(URI);
        console.log("connected to MongoDB");
        
    }catch(err){
        console.log("MongoDB Connection Error:", err)
        process.exit(1)
    }
};

export default connectDB;

