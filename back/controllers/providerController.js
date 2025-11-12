import Sprovider from "../models/providerModel.js";

/**
 * @desc    Get all provider
 * @route   GET /api/provider
 * @access  Public / Admin
 */
export const getAllProvider = async (req, res) => {
    try {
        const providers = await Sprovider.find({}, "-password"); // exclude password field
        return res.status(200).json({
            success: true,
            message: "All providers fetched successfully",
            providers,
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
 * @desc    Register new provider
 * @route   POST /api/provider/register
 * @access  Public
 */
export const registerProvider = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await Sprovider.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ success: false, message: "Email is already registered" });
        }

        // Generate custom user ID
        const sprovid = `SPROVIDER-${Date.now()}`;

        // Create and save new user
        const newUser = await Sprovider.create({ sprovid, name, email, password });

        // Exclude password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "Provider registered successfully",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error registering Provider:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
