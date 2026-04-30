import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Login for employee and admin
//POST /api/auth/login

export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        if (role_type === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({ message: "Not authorized as admin" })
        }

        if (role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ message: "Not authorized as employee" })
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Invalid email or password" })
        }


        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.json({ user: payload, token })
    } catch (err) {
        console.log("Login Error:", err);
        return res.status(500).json({ message: "Failed to login" });
    }
}


//Get session for employee and admin
//GET /api/auth/session


export const session = (req, res) => {
    const session = req.session;

    if (!req.session) return res.status(401).json({ message: "No session" });

    return res.json({ user: session });
}


//change password for employee and admin
//POST /api/auth/change-password

export const changePassword = async (req, res) => {
    try {
        const userSession = req.session;
        const { currentPassword, newPassword } = req.body;

        if (!userSession || !userSession.userId)
            return res.status(401).json({ message: "Unauthorized" });


        if (!currentPassword || !newPassword)
            return res.status(400).json({ message: "Both passwords field required" })

        const user = await User.findById(userSession.userId);
        
        if (!user)
            return res.status(404).json({ error: "User not found" });


        const isValid = await bcrypt.compare(currentPassword, user.password);

        if (!isValid)
            return res.status(400).json({ error: "Current password is incorrect" });

        const hashed = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userSession.userId, { password: hashed });


        return res.json({ success: true })

    } catch (error) {
        return res.status(500).json({ error: "Failed to change password" })
    }
}