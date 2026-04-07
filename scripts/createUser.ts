import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcrypt"

async function main() {
    const password = await bcrypt.hash("almeidas26", 10)

    await prisma.user.create({
        data: {
            name: "almeidas",
            password,
            role: "USER"
        }
    })

    console.log("Admin criado")
}

main().catch(console.error)
    .finally(() => prisma.$disconnect());