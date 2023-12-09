import jwt from "jsonwebtoken";
import { Users } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.status(500).json({
            success: false,
            message: "Not Logged In"
        })
    }

    const {_id} = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({_id});

    if(!user) {
        return res.status(500).json({
            success: false,
            message: "Not Logged In"
        })
    }

    req.user = user;

    next();
}