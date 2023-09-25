import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const MyMovies = sequelize.define(
    "mymovies",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
        },
        imdbID: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);