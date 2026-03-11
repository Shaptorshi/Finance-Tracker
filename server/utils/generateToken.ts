import jwt from 'jsonwebtoken'

export const generateToken = (userId: string): string => {
    return jwt.sign({userId:userId},process.env.JWT_SECRET_KEY as string,{expiresIn:"10m"});
}