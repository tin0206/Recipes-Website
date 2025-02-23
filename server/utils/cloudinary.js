import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImageToCloudinary = async (file, filename) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'recipes',
      public_id: filename,
      overwrite: true,
    })
    return result.secure_url
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error)
    throw error
  }
}

export const deleteImageFromCloudinary = async (filename) => {
  try {
    const publicId = `recipes/${filename}`
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
    throw error
  }
}