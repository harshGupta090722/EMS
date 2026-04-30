import "dotenv/config";
import { connectDb } from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const TemporaryPassword = "admin123";


async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

        if (!ADMIN_EMAIL) {
            console.error("MISSING ADMIN_EMAIL env variable");
            process.exit(1);
        }

        await connectDb();

        const exisitingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (exisitingAdmin) {
            console.log("User already exists as role", exisitingAdmin.role);
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);

        const admin = await User.create({
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN",
        })


        console.log("Admin user created");
        console.log("\nemail:", admin.email);
        console.log("\npassword:", TemporaryPassword);
        console.log("\nDon't forget to update password after first login");

        process.exit(0);
    } catch (error) {
        console.error("Seed failed", error);
    }
}

registerAdmin();