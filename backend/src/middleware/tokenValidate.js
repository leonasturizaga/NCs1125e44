const jwt = require("jsonwebtoken");

const tokenValidate = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if(!token || token === "") {
            return res.status(401).json({
                success: false,
                message: "Autorización denegada",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        return next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Autorización denegada"});
    }
}

module.exports = tokenValidate;