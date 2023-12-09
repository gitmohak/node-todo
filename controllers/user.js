import { Users } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../Utilities/features.js"
import ErrorHandler from "../middleware/error.js"

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const doesExist = await Users.findOne({ email });

        if (doesExist)
            return next(new ErrorHandler("User already exists", 500));

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({ name, email, password: hashedPassword });

        sendToken(user, 201, "Registered Successfully", req, res);
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email }).select("+password");

        if (!user)
            return next(new ErrorHandler("User does not exist", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return next(new ErrorHandler("Password is incorrect", 500));

        sendToken(user, 200, "Logged In Successfully", req, res);
    } catch (error) {
        next(error)
    }
}

export const userDetails = (req, res) => {
    const { name, email } = req.user;

    res.status(200).json({
        success: true,
        name, email
    })
}

export const userLogout = (req, res) => {
    req.user = null;

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "development" ? "none": "lax",
        secure: process.env.NODE_ENV === "development" ? true: false
    }).json({
        success: true,
        message: "Logged Out Successfully"
    })
}