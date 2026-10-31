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
      type: String,
      trim: true,
      default: "",
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
