
import dotenv from 'dotenv'
dotenv.config();
import mongoose from "mongoose";

const url= process.env.MONGO_URL

const mognooseConnection=async()=>{
    await mongoose.connect(`${url}/DevSumit`);
}

export default mognooseConnection;