import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcrypt"

async function main() {

    const adminExists = await prisma.user.findFirst({
        where: { role: "ADMIN" }
    })

    if (!adminExists) {

        const adminPassword = await bcrypt.hash("autoalmeidas26", 10)
        const userPassword = await bcrypt.hash("almeidas26", 10)

        await prisma.user.create({
            data: {
                name: "almeidas admin",
                password: adminPassword,
                role: "ADMIN"
            }
        })

        await prisma.user.create({
            data: {
                name: "almeidas",
                password: userPassword,
                role: "USER"
            }
        })

        console.log("Admin criado")

        console.log("User criado")

    } else {

        console.log("Usuário admin já existente.")

    }

}

main().catch(console.error)
    .finally(() => prisma.$disconnect());