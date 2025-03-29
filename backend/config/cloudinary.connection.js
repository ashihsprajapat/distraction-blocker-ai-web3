
import cloudinary from 'cloudinary'
import { config } from 'dotenv';
config();

const cloudinaryConnection = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }); 
}

export default cloudinaryConnection;

