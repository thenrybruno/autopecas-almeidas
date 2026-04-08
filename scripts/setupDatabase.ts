import { execSync } from "child_process"

async function setupDatabase() {
    
    console.log("Criando schema do banco....")

    execSync("npx prisma db push", { stdio: "inherit" })

    console. log("Criando usuários....")

    execSync("npx tsx scripts/createAdmin.ts", { stdio: "inherit" })

    console.log("Finalizado com sucesso.")

}

setupDatabase()