"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import Navbar from "../../components/Navbar"
import EditPartModal from "../../components/EditPartModal"
import { Search } from "lucide-react"

export default function AdminParts() {

    const [parts, setParts] = useState<any[]>([])
    const [selectedPart, setSelectedPart] = useState<any>(null)
    const [openModal, setOpenModal] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const role = localStorage.getItem("role")

        if (role !== "ADMIN") {
            alert("Acesso Negado!!")
            window.location.href = "/dashboard"
            return
        }

    }, [])

    function clearSearch() {

        setSearch("")
        setParts([])

    }

    async function loadParts() {

        const res = await fetch(`/api/parts?search=${search}`)
        const data = await res.json()

        setParts(data)
    }


    return (

        <div className="bg-linear-to-br from-background via-gradientColor to-primaryDark min-h-screen">

            <Navbar />

            <div className="p-10 text-textLight">

                <h1 className="text-2xl mb-4">
                    Gerenciamento de Peças
                </h1>

                <div className="flex gap-2 mb-6">

                    <div className="relative">

                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                        <input
                            placeholder="Buscar por nome, código ou marca"
                            value={search || ""}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 w-80 placeholder-textLight pl-12 outline-none"
                        />
                    </div>

                    <button
                        onClick={loadParts}
                        className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-4 rounded-2xl cursor-pointer w-32"
                    >
                        Buscar
                    </button>

                    <button
                        onClick={clearSearch}
                        className="bg-yellow-400 hover:bg-yellow-600 transition duration-300 px-4 rounded-2xl cursor-pointer w-32"
                    >
                        Limpar
                    </button>

                </div>

                <table className="mt-6 w-full bg-background text-textLight">

                    <thead>

                        <tr className="border">

                            <th className="border py-2 w-[50%]">Nome</th>
                            <th className="border py-2 w-[10%]">Código</th>
                            <th className="border py-2 w-[15%]">Marca</th>
                            <th className="border py-2 w-[5%]">Qtd</th>
                            <th className="border py-2 w-[10%]">Preço</th>
                            <th className="border py-2 w-[10%]">Ações</th>

                        </tr>

                    </thead>

                    <tbody className="bg-card">

                        {parts.map(p => (

                            <tr className="text-center border" key={p.id}>

                                <td className="border">{p.name}</td>
                                <td className="border">{p.code}</td>
                                <td className="border">{p.brand}</td>
                                <td className="border">{p.quantity}</td>
                                <td className="border">R$ {p.price}</td>

                                <td className="flex gap-2 justify-center py-2">

                                    <button
                                        onClick={() => {
                                            setSelectedPart(p)
                                            setOpenModal(true)
                                        }}
                                        className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-3 rounded-2xl py-1 cursor-pointer"
                                    >
                                        Editar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {openModal && (
                <EditPartModal part={selectedPart} onClose={() => setOpenModal(false)} onSaved={loadParts} />
            )}

        </div>

    )
}