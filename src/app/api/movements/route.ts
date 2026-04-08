import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)

    const month = Number(searchParams.get("month"))
    const year = Number(searchParams.get("year"))

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 1)

    const movements = await prisma.movement.findMany({
        where: {
            type: "SALE",

            createdAt: {
                gte: startDate,
                lt: endDate
            }
        },

        include: {
            part: true
        },

        orderBy: {
            createdAt: "desc"
        }
    })

    const totalValue = movements.reduce((total, m) => {
        return total + (m.unitPrice * m.quantity)
    }, 0)

    return NextResponse.json({
        movements,
        totalValue
    })
}