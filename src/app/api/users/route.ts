import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    
    const data = await req.json()

    const passwordHash = await bcrypt.hash(data.password, 10)

    if(data.isAdmin !== "ADMIN") {
        
        NextResponse.json({ error: "Usuário sem permissão"}, {status: 401})

    }

    const user = await prisma.user.create({
        data: {
            name: data.name,
            password: passwordHash,
            role: "USER"
        }
    })

    return NextResponse.json(user)
    
}