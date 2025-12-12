import { Router } from "express";
import { videoTestimony } from "../db.js";

const router = Router();

// Crear testimonio de video
router.post("/", async (req, res) => {
  try {
    const { title, description, videoType, videoUrl, userId } = req.body;

    if (!title || !videoType || !videoUrl) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newVideo = await videoTestimony.create({
      title,
      description,
      videoType,
      videoUrl,
      userId
    });

    res.json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos
router.get("/", async (req, res) => {
  try {
    const list = await videoTestimony.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
