import jwt from "jsonwebtoken";

export const sendToken = async (user, statusCode, message, req, res) => {
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        sameSite: process.env.NODE_ENV === "development" ? "none": "lax",
        secure: process.env.NODE_ENV === "development" ? true: false
    }).json({
        success: true,
        message
    });
}