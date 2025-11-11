import Suser from "../models/suserModel.js";

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Public / Admin
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await Suser.find({}, "-password"); // exclude password field
        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc    Register new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await Suser.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ success: false, message: "Email is already registered" });
        }

        // Generate custom user ID
        const suid = `SUSER-${Date.now()}`;

        // Create and save new user
        const newUser = await Suser.create({ suid, name, email, password });

        // Exclude password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
