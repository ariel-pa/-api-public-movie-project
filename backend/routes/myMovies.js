import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { postMyMovies } from "../controllers/myMovies.js";

const router = express.Router();

router.post("/mis-peliculas", verifyToken, postMyMovies);

export default router;