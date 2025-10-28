import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// Helper function to upload a file to Cloudinary
export async function uploadToCloudinary(
  filePath: string,
  folder: string = 'auxilium-documents'
): Promise<{ url: string; publicId: string }> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto', // Automatically detect file type
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload file to cloud storage')
  }
}

// Helper function to delete a file from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw', // For non-image files
    })
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    // Don't throw - deletion failure shouldn't block the operation
  }
}
