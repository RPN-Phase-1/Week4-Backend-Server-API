const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "your_secret_key";

const authenticate = () => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Token missing in authorization header" });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            next(); 
        } catch (error) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    };
};

const authorize = (roles = []) => {
    if (typeof roles === "string") {
        roles = [roles];
    }
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient role." });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
