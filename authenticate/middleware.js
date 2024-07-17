const { validateToken } = require("./auth");

function checkForAuthenticate(cookieName) {
    return async (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        console.log("hello")
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            res.clearCookie(cookieName);
            console.error("Token validation error:", error);
            res.status(401).json({ error: "Unauthorized" });
        }
    };
}

module.exports = checkForAuthenticate;
