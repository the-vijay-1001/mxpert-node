import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
export const Register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const isExist = await User.findOne({ email })
        if (!isExist) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt)
            req.body.password = hashedPassword;
            const user = await User.create({ name, email, password: hashedPassword, role })
            if (user)
                return res.json({ message: "User Register Success", data: user })
            else
                return res.json({ message: "Something went wrong..", data: null })
        }
        else {
            return res.json({ message: "User Already Exist", data: null })
        }
    } catch (error) {
        return res.json({ message: "Internal server error", error })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email })
            if (!user)
                return res.json({ message: "User Not Found" })
            const isMatched = await bcryptjs.compare(password, user.password)
            if (isMatched) {
                const payload = {
                    password: password,
                    email: email
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
                if (token) {
                    return res.json({ message: "Login Success", data: user, token, status: true })
                }
            }
            else {
                return res.json({ message: "Invalid Credential", status: false })
            }
        }
        else {
            return res.json({ message: "Email & password must required", status: false })
        }
    } catch (error) {
        return res.json({ message: "Internal server error", error, status: false })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (user) {
            return res.status(200).json({ message: "User found", data: user ,status:true});
        }
    } catch (error) {
        return res.json({ message: "Internal server error", error, status: false })
    }
}