import { Router } from "express";
import { getStories, createStory, updateStory, deleteStory, likeStory, getStoriesByTag } from "../controlers/stories.js";
const router = Router();
import authentication from '../midlewares/authentication.js'

router.get("/", getStories);
router.get("/tags", getStoriesByTag);
router.post("/", authentication, createStory);
router.patch("/:id", authentication, updateStory);
router.delete("/:id", authentication, deleteStory);
router.patch("/:id/likeStory", authentication, likeStory);

export default router;