import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcrypt"

async function main() {
    const password = await bcrypt.hash("autoalmeidas26", 10)

    await prisma.user.create({
        data: {
            name: "almeidas admin",
            password,
            role: "ADMIN"
        }
    })

    console.log("Admin criado")
}

main().catch(console.error)
    .finally(() => prisma.$disconnect());