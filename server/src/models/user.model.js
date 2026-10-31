
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Authentication
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    // Profile Information
    name: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    roles: {
      type: [
        {
          type: String,
          enum: [
            "Developer",
            "Designer",
            "Tester",
            "Vibe Coder",
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "UI/UX Designer",
          ],
        },
      ],
      default: [],
      validate: {
        validator: (roles) => roles.length <= 3,
        message: "You can select a maximum of 3 roles.",
      },
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
