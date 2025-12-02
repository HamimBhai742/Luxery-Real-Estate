import { v2 as cloudinary } from 'cloudinary';
import { ENV } from './env';
import { AppError } from '../error/coustom.error';

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_API_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export const deleteCloudinaryImage = async (url: string) => {
  try {
const match = url.match(/([^/]+\.(?:png|jpe?g|gif|webp))$/i);
    if (match && match[1]) {
      const publicId = match[1].replace(/\.(png|jpe?g|gif|webp)$/i, "");
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.log(error);
    throw new AppError('Cloudinary images delete failed', 500);
  }
};

export const cloudinaryUpload = cloudinary;