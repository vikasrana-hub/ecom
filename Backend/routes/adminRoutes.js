const express = require('express');
const router = express.Router();
const { User, Product } = require('../db/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
JWT_SECRET = process.env.JWT_SECRET || "ecom"
const adminware = require('../middleware/adminware');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {

        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if (user.is_admin === false) {
            console.log("User is not admin, setting to true...");
            user.is_admin = true;
            await user.save();
        }
    
        const token = jwt.sign({ userid: user._id }, JWT_SECRET)

    res.status(200).json({

        message: "Admin login successful",
        token: token
    })
} catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
}
});
router.post('/uploadProduct', adminware, async (req, res) => {
    const { name, price, description,url } = req.body;
    if (!name || !price || !description || !url) {
        return res.status(400).json({ message: "Name, price and description are required" });
    }
    try {

        const newProduct = new Product({
            name,
            price,
            description,
            url:url

        });
        await newProduct.save();
        res.status(201).json({ message: "Product uploaded successfully", product: newProduct });

    } catch (error) {
        console.error("Product upload error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;