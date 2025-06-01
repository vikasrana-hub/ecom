const bcrypt = require('bcrypt');
const express = require('express');
const z = require('zod');
const jwt = require('jsonwebtoken');
const { User, Product } = require('../db/schema');
const authenticate = require('../middleware/middleware');
const JWT_SECRET = process.env.JWT_SECRET || "ecom"

const router = express.Router();

const userSchema = z.object({
    firstname: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

router.post('/signup', async (req, res) => {
    const data = req.body;

    const parsedData = userSchema.safeParse(data);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedData.error.errors
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create and save user
        const newUser = await User.create({
            email: data.email,
            password: hashedPassword,
            firstname: data.name,
            lastname: data.name
        });
        userid = newUser._id;
        console.log(userid)
        const token = jwt.sign({ userid }, JWT_SECRET)

        console.log("Token generated:", token);

        res.status(201).json({ message: "User created successfully"
            ,token: token
         });

        // window.localStorage.setItem("token", token);
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error" });
    }


});

const val = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const parsedData = val.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedData.error.errors
        });
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userid: user._id }, JWT_SECRET)

        // window.localStorage.setItem("token", token);

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });

    }


})
router.post('/cart/:Product_id', authenticate,async (req, res) => {
    const userid = req.user.userid;
    const product_id = req.params.Product_id
    console.log(product_id)
    try {
        const product = await Product.findById(product_id);
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: "Product out of stock" });
        }

        const user = await User.findById(userid);
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.cart.push({
            product_id: product._id,
            name:product.name,
            price: product.price
        });
        await user.save();
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
});
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});
router.get('/product/:productid', async (req, res) => {
    const productid = req.params.productid;

    try {
        const product = await Product.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/profile', authenticate, async (req, res) => {
    const userid = req.user.userid;
    try {
        const user = await User.findById(userid).populate('cart.product_id');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user: { 
            id: user._id,
            email: user.email,
            name: user.firstname,
            cart: user.cart
        } });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/cart', authenticate, async (req, res) => {
    const userid = req.user.userid;
    try {
        const user = await User.findById(userid)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})
router.put('/order', authenticate, async (req, res) => {
    const userid = req.user.userid;
    const { productid } = req.body;

    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        user.cart = user.cart.filter(item => !productid.includes(item.product_id.toString()));
        await user.save();

        res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
