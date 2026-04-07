import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}

export function generateToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    })
}