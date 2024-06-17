import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Check both the 'token' header and 'authorization' header
    const token = req.headers.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
