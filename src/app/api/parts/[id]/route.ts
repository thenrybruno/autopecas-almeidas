import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    try {
        const data = await req.json()

        const part = await prisma.part.update({
            where: {
                id
            },

            data: {
                name: data.name,
                code: data.code,
                brand: data.brand,
                quantity: Number(data.quantity),
                price: Number(data.price)
            }
        })

        return NextResponse.json(part)
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao atualizar peça" },
            { status: 500 }
        )
    }

}