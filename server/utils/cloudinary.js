const cloudinary = require("cloudinary");
// {v2 as cloudinary} from
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //upload file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file has been uploaded successfully");
    fs.unlinkSync(localFilePath); //remove the locally saved
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = uploadOnCloudinary;
