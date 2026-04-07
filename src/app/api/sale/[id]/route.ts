import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    
    const { id } = await params

    try {
        
        const sale = await prisma.movement.findUnique({
            where: { id }
        })

        if(!sale) {
            return NextResponse.json(
                { error: "Venda não encontrada" },
                { status: 404 }
            )
        }

        await prisma.movement.delete({
            where: { id }
        })

        await prisma.part.update({
            where: {id: sale.partId},
            data: {
                quantity: {
                    increment: sale.quantity
                }
            }
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        
        return NextResponse.json(
            { error: "Erro ao excluir peça" },
            { status: 500 }
        )
    }
}