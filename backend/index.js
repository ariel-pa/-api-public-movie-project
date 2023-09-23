import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { sequelize } from "./database/database.js";
import authRoutes from "./routes/auth.js";
import { register } from './controllers/auth.js';
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());



/* ROUTES */
app.post("/auth/register", register);
app.use("/auth", authRoutes);



const PORT = process.env.PORT || 3000;
async function main() {
    try {
        await sequelize.sync({force: false});
        console.log('Connection has been established successfully.');
        app.listen(PORT);
        console.log(`Server on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
main();
