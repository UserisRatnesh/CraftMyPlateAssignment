
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

const authenticateJwt = (res, req, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }


            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(401);
    }
};

export default  authenticateJwt;
