import { Request, Response } from 'express'
import { USER } from '../models/user.model'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken'
import { registerValidate, loginValidate } from '../validations/user.validation'

export const Register = async (req: Request, res: Response) => {
    try {
        const parsed = registerValidate.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.issues[0].message })
        }

        const { name, email, password, confirmPassword } = parsed.data;

        const existedUser = await USER.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match!" });
        }
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        const user = await USER.create({
            name,
            email,
            password: hashedPassword
        })

        const token = generateToken(user._id.toString())

        return res.status(200).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const parsed = loginValidate.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: parsed.error.issues[0].message });
        }

        const { email, password } = parsed.data;

        const existedUser = await USER.findOne({ email });
        if (!existedUser) {
            return res.status(400).json({ message: "You don't have an account.Please create one first." });
        }
        const passwordCheck = await bcrypt.compare(password.trim(), existedUser.password);


        if (!passwordCheck) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(existedUser._id.toString());

        return res.status(200).json({
            message: "User Logged In Successfully",
            token,
            user: {
                id: existedUser._id,
                email: existedUser.email,
                password: existedUser.password
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Error occurred while logging" })
    }
}