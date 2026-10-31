import linkModel from "../models/link.model.js";

export async function createLink(req, res) {
  try {
    const { title, url } = req.body;
    const userId = req.user.id;
    const links = await linkModel.create({
      user: userId,
      title,
      url,
    });
    return res.status(201).json({
      success: true,
      message: "Link created successfully",
      data: links,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create link",
      error: error.message
    });
  }
}
