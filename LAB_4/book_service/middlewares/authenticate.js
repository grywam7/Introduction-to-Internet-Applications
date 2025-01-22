const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    // Log the incoming token for debugging
    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const payload = jwt.verify(token, "secret_key");
        req.user = payload; // Attach user info from the token to the request
        next();
    } catch (error) {
        console.error("Token validation error:", error.message);
        res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = authenticate;
