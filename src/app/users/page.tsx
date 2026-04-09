"use client"

import { useState } from "react"
import { toast } from "sonner"
import Navbar from "../components/Navbar"
import Image from "next/image"
import { Lock, Eye, EyeOff, User } from "lucide-react"

export default function Users() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const isAdmin = localStorage.getItem("role")

    function cleanForm() {
        setName("")
        setPassword("")
    }

    function handleKeyDown(e: React.KeyboardEvent) {

        if (e.key === "Enter") {

            e.preventDefault()
            createUser()

        }

    }

    async function createUser() {

        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, password, isAdmin })
        })

        if (res.ok) {

            toast.success("Usuário criado com sucesso.")
            cleanForm()

        } else {

            toast.error("Erro ao criar usuário.")
        }
    }

    return (

        <div className="bg-linear-to-br from-background via-gradientColor to-primaryDark min-h-screen">

            <Navbar />

            <div className="w-full mt-10 flex items-center justify-center">

                <div className="p-8 flex flex-col gap-5 w-96 bg-card text-textLight rounded border border-cardBorder">

                    <div className="flex flex-col items-center">

                        <Image src="/auto-peca.png" alt="Auto Peças" width={70} height={50} />

                        <h1 className="text-2xl text-center">
                            Cadastro de Usuários
                        </h1>

                    </div>

                    <div className="relative">

                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" size={20} />

                        <input
                            type="text"
                            placeholder="Nome"
                            onKeyDown={handleKeyDown}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 rounded bg-background text-textLight border border-borderColor w-full pl-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:shadow-[0_0_10px_rgba(225,29,46,0.7)]"
                        />
                    </div>

                    <div className="relative">

                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            onKeyDown={handleKeyDown}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 rounded bg-background text-textLight border border-borderColor w-full pl-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:shadow-[0_0_10px_rgba(225,29,46,0.7)]"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        >

                            {showPassword ? (
                                <EyeOff size={20} className="text-textLight" />
                            ) : (
                                <Eye size={20} className="text-textLight" />
                            )}

                        </button>
                    </div>

                    <button onClick={createUser} className="bg-green-600 hover:bg-green-800 transition duration-300 text-white px-4 py-2 rounded-2xl cursor-pointer">
                        Cadastrar
                    </button>

                    <button
                        onClick={cleanForm}
                        className="bg-yellow-400 hover:bg-yellow-600 text-black transition duration-300 px-4 py-2 rounded-2xl cursor-pointer"
                    >
                        Limpar
                    </button>

                </div>

            </div>

        </div>
    )
}