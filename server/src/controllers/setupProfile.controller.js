
import userModel from "../models/user.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";

const imageKitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function setupProfile(req, res) {
  try {
    // CHANGE 1:
    // You used req.user.id.
    // Mongoose documents also expose _id, so using req.user._id
    // makes it explicit that we are accessing MongoDB's document ID.
    const userId = req.user._id;

    // CHANGE 2:
    // profileImage was destructured from req.body in your original code.
    // But when uploading files using Multer, the uploaded image
    // is available in req.file, not req.body.
    const { name, bio, roles } = req.body;

    // CHANGE 3:
    // First find the user, then upload the image.
    // In your original code, you uploaded the image before checking
    // whether the user actually existed.
    // That could cause unnecessary ImageKit uploads.
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // CHANGE 4:
    // FormData sends non-file values as strings.
    // So roles arrives as a JSON string, not a JavaScript array.
    // We need JSON.parse() before assigning it to the Mongoose array field.
    const parsedRoles = JSON.parse(roles || "[]");

    // CHANGE 5:
    // Only upload an image if the user actually selected one.
    // This also allows users to update their name, bio or roles
    // without uploading a new profile picture every time.
    if (req.file) {
      const file = await imageKitClient.files.upload({
        // In your original code:
        // re.file.buffer was incorrect because "re" was a typo.
        // The correct reference is req.file.buffer.
        //
        // Multer memoryStorage() provides the image as a Buffer.
        // toFile() converts that Buffer into a file object
        // accepted by the ImageKit SDK.
        file: await toFile(
          req.file.buffer,
          req.file.originalname
        ),

        // CHANGE 6:
        // Use a unique filename to avoid filename collisions.
        fileName: `profile-${userId}-${Date.now()}`,

        folder: "/users",
      });

      // Store the uploaded image URL in MongoDB,
      // not the actual image binary.
      user.profileImage = file.url;
    }

    // Update the user's profile fields.
    user.name = name;
    user.bio = bio;
    user.roles = parsedRoles;

    // CHANGE 7:
    // Your original code did not update isProfileComplete.
    // This flag helps the frontend determine whether the user
    // needs to complete their profile or can access the dashboard.
    user.isProfileComplete = true;

    // Save all changes to MongoDB.
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User profile completed successfully",

      // CHANGE 8:
      // Return the updated user so the frontend can update
      // its AuthContext without making another API request.
      // Do not return the password.
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        bio: user.bio,
        profileImage: user.profileImage,
        roles: user.roles,
        isProfileComplete: user.isProfileComplete,
      },
    });

  } catch (error) {
    // CHANGE 9:
    // Your original catch block was empty.
    // This silently swallowed errors and made debugging difficult.
    // Log the actual error on the backend.
    console.error("Setup Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete profile",
    });
  }
}
