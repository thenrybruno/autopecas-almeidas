import { prisma } from "@/src/lib/prisma"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// function checkAdmin(req: Request) {
//     const token = req.headers.get("authorization")

//     if (!token) return false

//     const decode: any = jwt.verify(
//         token.replace("Bearer ", ""),
//         process.env.JWT_SECRET!
//     )

//     return decode.role === "ADMIN"
// }

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

// export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {

//     const { id } = await params

//     try {

//         const moviment = await prisma.movement.findFirst({
//             where: { partId: id }
//         })

//         if(moviment) {
//             return NextResponse.json(
//                 { error: "Peça possui venda registrada, e não pode ser excluida" },
//                 { status: 400 }
//             )
//         }

//         await prisma.part.delete({
//             where: {
//                 id
//             }
//         })

//         return NextResponse.json({ success: true })

//     } catch (error) {

//         console.error(error)

//         return NextResponse.json(
//             { error: "Erro ao deletar peça" },
//             { status: 500 }
//         )
//     }

    // if (!checkAdmin(req)) {
    //     return NextResponse.json(
    //         { error: "Sem permissão." },
    //         { status: 403 }
    //     )
    // }


// }