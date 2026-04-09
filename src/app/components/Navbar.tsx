"use client"

import Link from "next/link"
import LogoutButton from "./LogoutButton"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Navbar() {

    const [role, setRole] = useState("")

    useEffect(() =>{
        const r = localStorage.getItem("role")

        if(r) setRole(r)
    }, [])

    return (
        <div className="w-full bg-background text-textLight px-6 py-4 flex justify-between items-center">
            
            <Image src="/auto-peca.png" alt="Auto Peças" width={80} height={50}/>

            <div className="flex gap-6">
                <Link href="/dashboard" className="hover:text-textSecondary hover:scale-105 ease-in-out transition duration-400">
                    Dashboard
                </Link>

                <Link href="/parts" className="hover:text-textSecondary hover:scale-105 ease-in-out transition duration-400">
                    Cadastrar Peças
                </Link>

                <Link href="/sales" className="hover:text-textSecondary hover:scale-105 ease-in-out transition duration-400">
                    Relatório de Vendas
                </Link>

                {role === "ADMIN" && (
                    <Link href="/admin/parts" className="hover:text-textSecondary hover:scale-105 ease-in-out transition duration-400">
                        Gerenciar Peças
                    </Link>
                )}

                {role === "ADMIN" && (
                    <Link href="/users" className="hover:text-textSecondary hover:scale-105 ease-in-out transition duration-400">
                        Cadastrar Vendedor
                    </Link>
                )}
            </div>

            <LogoutButton />
        </div>
    )
}