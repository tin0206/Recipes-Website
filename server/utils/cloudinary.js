import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'recipes',
    })
    return result.secure_url
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error)
    throw error
  }
}