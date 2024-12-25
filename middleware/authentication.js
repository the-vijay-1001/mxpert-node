import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = auth.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Token missing in authorization header" });
        }
        const isValid = jwt.verify(token, process.env.SECRET_KEY);
        if (isValid) {
            next();
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.log('✌️error --->', error);
        return res.json({ message: error })
    }

}