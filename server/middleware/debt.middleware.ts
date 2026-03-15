
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'

interface AuthRequest extends Request {
    userId?: string
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;
        // console.log('Secret in middleware: ',authHeader)

        if (!authHeader) {
            return res.status(401).json({ message: "no token provided" })
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string }

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log(`JWT Error ${error}`)
        return res.status(401).json({ message: "invalid token" })
    }
}