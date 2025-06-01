const jwt = require("jsonwebtoken");
const { User } = require("../db/schema");
const adminware = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token){
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const JWT_SECRET = process.env.JWT_SECRET || "ecom"
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.is_admin === true) {
            req.userId = decoded.userid;
            return next();
        }
        return res.status(403).json({ message: "Forbidden: Admin access required" });

    } catch (error) {
        console.error("Admin middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
module.exports = adminware;