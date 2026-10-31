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
    const userId = req.user._id;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("CONTENT TYPE:", req.headers["content-type"]);

    // Get normal text fields from req.body
    const { name, bio, roles } = req.body;

    // Find the authenticated user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload profile image only when a new image is provided
    if (req.file) {
      const file = await imageKitClient.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: `profile-${userId}-${Date.now()}`,
        folder: "/users",
      });

      // Save ImageKit URL in MongoDB
      user.profileImage = file.url;
    }

    // Update profile fields
    user.name = name;
    user.bio = bio;
    user.roles = roles || ""; // Direct string assignment; no JSON.parse()

    // Mark profile as completed
    user.isProfileComplete = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User profile completed successfully",
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
    console.error("Setup Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete profile",
    });
  }
}
