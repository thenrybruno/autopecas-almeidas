import { generateToken, verifyPassword } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const { name, password } = await req.json()
    const user = await prisma.user.findFirst({
        where: { name }
    })

    if(!user) {
        return NextResponse.json({ error: "Usuário não encontrado!"}, {status: 401})
    }

    const valid = await verifyPassword(password, user.password)

    if(!valid) {
        return NextResponse.json({ error: "Senha Inválida!"}, {status: 401})
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    })

    return NextResponse.json({ token, role: user.role})
}