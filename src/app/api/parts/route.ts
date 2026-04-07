import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    
    const { searchParams } = new URL(req.url)

    const search = searchParams.get("search") || ""

    const parts = await prisma.part.findMany({

        where: {
            OR: [
                {
                    name: {
                        contains: search
                    }
                },
                {
                    brand: {
                        contains: search
                    }
                },
                {
                    code: {
                        contains: search
                    }
                }
            ]
        },

        orderBy: {
            name: "asc"
        }
    })

    return NextResponse.json(parts)
}

export async function POST(req: Request) {
    const data = await req.json()
    const part = await prisma.part.create({
        data
    })

    await prisma.movement.create({
        data: {
            partId: part.id,
            type: "ENTRY",
            quantity: part.quantity
        }
    })

    return NextResponse.json(part)
}