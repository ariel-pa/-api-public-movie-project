import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            usuario,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            usuario,
            password: passwordHash,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// /* LOGIN */
export const login = async (req, res) => {
    try {
        
        const { usuario, password } = req.body;
        const user = await User.findOne({
            where: { usuario: usuario },
          });
          
        if (!user) return res.status(400).json({ message: "El usuario no existe. " });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Credenciales ivalidos. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}