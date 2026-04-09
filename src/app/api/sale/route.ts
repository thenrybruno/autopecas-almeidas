import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    const { partId, quantity, userId } = await req.json()

    const part = await prisma.part.findUnique({
        where: {id: partId}
    })

    if(!part) {
        return NextResponse.json({ error: "Peça não encontrada!" })
    }

    if(part.quantity < quantity) {
        return NextResponse.json({ error: "Estoque insuficiente!" })
    }

    await prisma.part.update({
        where: { id: partId },
        data: {
            quantity: part.quantity - quantity
        }
    })

    await prisma.movement.create({
        data: {
            partId,
            type: "SALE",
            quantity,
            unitPrice: part.price,
            total: part.price,
            sellerId: userId,
        }
    })

    return NextResponse.json({ ok: true })
}