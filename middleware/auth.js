const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.header("Authorization");

    console.log(authHeader, "authHeader")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Get token after "Bearer"
    console.log(token, "token")
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded,"token")
        req.user = decoded.user; // set req.user = { id: user._id }
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
