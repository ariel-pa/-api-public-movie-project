import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { MyMovies } from "./MyMovies.js"

export const User = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        usuario: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);
//UNO A MUCHOS
User.hasMany(MyMovies, {
    foreignKey: 'id_user',
    sourceKey: 'id',
});
MyMovies.belongsTo(User, {
    foreignKey: 'id_user',
    targetKey: 'id',
});