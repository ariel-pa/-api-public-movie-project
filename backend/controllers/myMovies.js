import { MyMovies } from "../models/MyMovies.js";

export const postMyMovies = async (req, res) => {
    try {

        const { id_user, imdbID } = req.body;

        const existingMovie = await MyMovies.count({
            where: {
                id_user: `${id_user}`,
                imdbID: imdbID,
            },
        });

        if (existingMovie > 0 ) {
            return res.status(409).json({ message: "Ya se tiene la película!" });
        }

        const newMyMovies = await MyMovies.create({
            id_user,
            imdbID,
        });

        res.status(201).json(newMyMovies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}